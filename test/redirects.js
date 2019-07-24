'use strict'

const Lab = require('@hapi/lab')
const Hapi = require('@hapi/hapi')
const { expect } = require('@hapi/code')

let server

const { describe, it, beforeEach } = (exports.lab = Lab.script())

describe('redirect responses:', () => {
  beforeEach(async () => {
    server = new Hapi.Server()
    await server.initialize()

    await server.register({
      plugin: require('../lib/index')
    })
  })

  describe('h.permanentRedirect ->', () => {
    it('redirects permanently with status 301', async () => {
      server.route({
        path: '/',
        method: 'GET',
        handler: (_, h) => h.permanentRedirect('/login')
      })

      const request = {
        url: '/',
        method: 'GET'
      }

      const response = await server.inject(request)
      expect(response.statusCode).to.equal(301)
    })

    it('redirects by default with status 302', async () => {
      server.route({
        path: '/',
        method: 'GET',
        handler: (_, h) => h.redirect('/login')
      })

      const request = {
        url: '/',
        method: 'GET'
      }

      const response = await server.inject(request)
      expect(response.statusCode).to.equal(302)
    })

    it('redirects temporarily with payload (status 307)', async () => {
      server.route([
        {
          method: 'POST',
          path: '/',
          handler: (_, h) => {
            return h.redirectWithPayload('/new')
          }
        }
      ])

      const request = {
        url: '/',
        method: 'POST'
      }

      const response = await server.inject(request)
      expect(response.statusCode).to.equal(307)
      expect(response.headers.location).to.equal('/new')
    })

    it('redirects permanently with payload (status 308)', async () => {
      server.route([
        {
          method: 'POST',
          path: '/',
          handler: (_, h) => {
            return h.permanentRedirectWithPayload('/new')
          }
        }
      ])

      const request = {
        url: '/',
        method: 'POST'
      }

      const response = await server.inject(request)
      expect(response.statusCode).to.equal(308)
      expect(response.headers.location).to.equal('/new')
    })
  })
})
