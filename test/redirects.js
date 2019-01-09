'use strict'

const Lab = require('lab')
const Code = require('code')
const Hapi = require('hapi')

let server

const { describe, it, beforeEach } = (exports.lab = Lab.script())
const expect = Code.expect

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
  })
})
