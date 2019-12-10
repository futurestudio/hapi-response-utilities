'use strict'

const Path = require('path')
const Lab = require('@hapi/lab')
const Hapi = require('@hapi/hapi')
const Boom = require('@hapi/boom')
const Vision = require('@hapi/vision')
const { expect } = require('@hapi/code')

let server

const { experiment, it, beforeEach } = (exports.lab = Lab.script())

experiment('hapi-response-utilities', () => {
  beforeEach(async () => {
    server = new Hapi.Server({
      routes: {
        validate: {
          failAction: (_, __, error) => {
            throw error
          }
        }
      }
    })

    await server.initialize()

    await server.register({
      plugin: require('../lib/index')
    })
  })

  it('status()', async () => {
    server.route({
      path: '/',
      method: 'GET',
      handler: (_, h) => {
        return h.status(204)
      }
    })

    const request = {
      url: '/',
      method: 'GET'
    }

    const response = await server.inject(request)
    expect(response.statusCode).to.equal(204)
  })

  it('cookie()', async () => {
    server.route({
      path: '/',
      method: 'GET',
      handler: (_, h) => {
        return h
          .cookie('userId', '1')
          .cookie('username', 'Marcus')
          .continue
      }
    })

    const request = {
      url: '/',
      method: 'GET'
    }

    const response = await server.inject(request)
    expect(response.statusCode).to.equal(200)

    const cookies = response.headers['set-cookie'].join(';').split(';')
    expect(cookies).to.include('userId=1')
    expect(cookies).to.include('username=Marcus')
  })

  it('pdf()', async () => {
    server.route({
      path: '/',
      method: 'GET',
      handler: (_, h) => {
        return h.pdf(null, 'hapi-response-utilities')
      }
    })

    const request = {
      url: '/',
      method: 'GET'
    }

    const response = await server.inject(request)
    expect(response.statusCode).to.equal(200)
    expect(response.headers['content-type']).to.equal('application/pdf')
    expect(response.headers['content-disposition']).to.contain('hapi-response-utilities')
    expect(response.payload).to.exist()
  })

  experiment('header()', () => {
    const testHeadersWith = async (method) => {
      const server = Hapi.server()

      await server.register({
        plugin: require('../lib/index')
      })

      server.route({
        method: 'GET',
        path: '/non-error',
        options: {
          handler: () => ({ success: true }),
          ext: {
            onPreResponse: { method }
          }
        }
      })

      server.route({
        method: 'GET',
        path: '/error',
        options: {
          handler: () => {
            throw Boom.unauthorized('Original message')
          },
          ext: {
            onPreResponse: { method }
          }
        }
      })

      return server
    }

    it('throws when response is not available', async () => {
      server.route({
        path: '/',
        method: 'GET',
        handler: (_, h) => {
          expect(() => h.header('key', 'value')).to.throw()

          return 'success'
        }
      })

      const response = await server.inject('/')
      expect(response.payload).to.equal('success')
    })

    it('sets headers without any options', async () => {
      const server = await testHeadersWith((_, h) => {
        return h
          .header('a', 'x')
          .header('b', 'x')
          .header('b', 'y')
          .continue
      })

      const { headers: errorHeaders } = await server.inject('/error')
      const { headers: nonErrorHeaders } = await server.inject('/non-error')

      expect(errorHeaders).to.contain({ a: 'x', b: 'y' })
      expect(nonErrorHeaders).to.contain({ a: 'x', b: 'y' })
    })

    it('does not set existing header when override is false', async () => {
      const server = await testHeadersWith((_, h) => {
        return h
          .header('a', 'x', { override: false })
          .header('a', 'y', { override: false })
          .continue
      })

      const { headers: errorHeaders } = await server.inject('/error')
      const { headers: nonErrorHeaders } = await server.inject('/non-error')

      expect(errorHeaders).to.contain({ a: 'x' })
      expect(nonErrorHeaders).to.contain({ a: 'x' })
    })

    it('appends to existing headers with separator', async () => {
      const server = await testHeadersWith((_, h) => {
        return h
          .header('a', 'x', { append: true })
          .header('A', 'y', { append: true })
          .header('b', 'x', { append: true, separator: ';' })
          .header('B', 'y', { append: true, separator: ';' })
          .continue
      })

      const { headers: errorHeaders } = await server.inject('/error')
      const { headers: nonErrorHeaders } = await server.inject('/non-error')

      expect(errorHeaders).to.contain({ a: 'x,y', b: 'x;y' })
      expect(nonErrorHeaders).to.contain({ a: 'x,y', b: 'x;y' })
    })

    it('handles special case for appending set-cookie', async () => {
      const server = await testHeadersWith((_, h) => {
        return h
          .header('set-cookie', 'a=x', { append: true })
          .header('set-cookie', 'b=x', { append: true })
          .header('set-cookie', 'b=y', { append: true })
          .continue
      })

      const { headers: errorHeaders } = await server.inject('/error')
      const { headers: nonErrorHeaders } = await server.inject('/non-error')

      expect(nonErrorHeaders).to.contain({ 'set-cookie': ['a=x', 'b=x', 'b=y'] })
      expect(errorHeaders).to.contain({ 'set-cookie': ['a=x', 'b=x', 'b=y'] })
    })

    it('prevents duplicates when appending when duplicate is false', async () => {
      const server = await testHeadersWith((_, h) => {
        return h
          .header('a', 'x', { append: true })
          .header('A', 'y', { append: true })
          .header('a', 'y', { append: true, duplicate: false })
          .header('b', 'x', { append: true, separator: ';' })
          .header('B', 'y', { append: true, separator: ';' })
          .header('b', 'y', { append: true, separator: ';', duplicate: false })
          .continue
      })

      const { headers: errorHeaders } = await server.inject('/error')
      const { headers: nonErrorHeaders } = await server.inject('/non-error')

      expect(errorHeaders).to.contain({ a: 'x,y', b: 'x;y' })
      expect(nonErrorHeaders).to.contain({ a: 'x,y', b: 'x;y' })
    })
  })

  experiment('headers()', () => {
    it('throws when response is not available', async () => {
      server.route([
        {
          path: '/error',
          method: 'GET',
          handler: (_, h) => {
            expect(() => h.headers()).to.throw()
            return 'error'
          }
        },
        {
          path: '/no-error',
          method: 'GET',
          options: {
            handler: (_, h) => {
              expect(() => h.headers()).to.throw()
              return 'error'
            },
            ext: {
              onPreResponse: {
                method: (_, h) => {
                  expect(() => h.headers).to.not.throw()
                  return 'no-error'
                }
              }
            }
          }
        }
      ])

      const { payload: errorPayload } = await server.inject('/error')
      const { payload: noErrorPayload } = await server.inject('/no-error')
      expect(errorPayload).to.equal('error')
      expect(noErrorPayload).to.equal('no-error')
    })

    it('gets headers values from a non-error response', async () => {
      let headers

      server.route({
        path: '/',
        method: 'GET',
        options: {
          handler: () => {
            return 'success'
          },
          ext: {
            onPreResponse: {
              method: (request, h) => {
                request.response.header('a', 'x')
                request.response.header('b', 'y')

                headers = h.headers()

                return h.continue
              }
            }
          }
        }
      })

      const { headers: responseHeaders } = await server.inject('/')
      expect(headers).to.contain({ a: 'x', b: 'y' })
      expect(responseHeaders).to.contain({ a: 'x', b: 'y' })
    })

    it('gets headers values from an error response', async () => {
      let headers

      server.route({
        path: '/',
        method: 'GET',
        options: {
          handler: () => {
            throw Boom.unauthorized('Original message')
          },
          ext: {
            onPreResponse: {
              method: (request, h) => {
                request.response.output.headers.a = 'x'
                request.response.output.headers.b = 'y'

                headers = h.headers()

                return h.continue
              }
            }
          }
        }
      })

      const { headers: responseHeaders } = await server.inject('/')
      expect(headers).to.contain({ a: 'x', b: 'y' })
      expect(responseHeaders).to.contain({ a: 'x', b: 'y' })
    })
  })

  experiment('isView', () => {
    it('returns false when response is not available', async () => {
      server.route({
        path: '/',
        method: 'GET',
        options: {
          handler: (_, h) => {
            expect(h.isView()).to.be.false()

            return h.continue
          }
        }
      })

      await server.inject('/')
    })

    it('returns false when responding JSON', async () => {
      server.route({
        path: '/',
        method: 'GET',
        options: {
          handler: (_, h) => {
            expect(h.isView()).to.be.false()

            return { name: 'Marcus' }
          },
          ext: {
            onPreResponse: {
              method: (_, h) => {
                expect(h.isView()).to.be.false()

                return h.continue
              }
            }
          }
        }
      })

      await server.inject('/')
    })

    it('returns true when rendering a view', async () => {
      await server.register(Vision)

      server.views({
        engines: { hbs: require('handlebars') },
        path: Path.resolve(__dirname, 'fixtures/views')
      })

      server.route({
        path: '/',
        method: 'GET',
        options: {
          handler: async (_, h) => {
            return h.view('index')
          },
          ext: {
            onPreResponse: {
              method: (_, h) => {
                expect(h.isView()).to.be.true()
                return h.continue
              }
            }
          }
        }
      })

      const { result, statusCode } = await server.inject('/')
      expect(statusCode).to.equal(200)
      expect(result).to.include('<p>hapi-response-utilities are awesome</p>')
    })
  })
})
