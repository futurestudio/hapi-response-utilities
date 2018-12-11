'use strict'

const Fs = require('fs')
const Lab = require('lab')
const Code = require('code')
const Hapi = require('hapi')
const Path = require('path')

let server

const { experiment, it, beforeEach } = (exports.lab = Lab.script())
const expect = Code.expect

experiment('hapi-response-utilities plugin', () => {
  beforeEach(async () => {
    server = new Hapi.Server()
    await server.initialize()

    await server.register({
      plugin: require('../lib/index')
    })
  })

  it('tests the h.status decoration', async () => {
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

  it('tests the h.cookie decoration', async () => {
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

  it('tests the h.pdf decoration', async () => {
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

  it('tests the h.png decoration', async () => {
    const file = Fs.readFileSync(Path.resolve(__dirname, 'fixtures', 'futurestudio.png'))

    server.route({
      path: '/',
      method: 'GET',
      handler: (_, h) => h.png(file)
    })

    const request = {
      url: '/',
      method: 'GET'
    }

    const response = await server.inject(request)
    expect(response.statusCode).to.equal(200)
    expect(response.headers['content-type']).to.equal('image/png')
    expect(response.headers['content-disposition']).to.contain('inline')
    expect(response.payload).to.exist()
  })
})
