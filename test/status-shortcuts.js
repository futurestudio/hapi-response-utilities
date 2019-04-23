'use strict'

const Lab = require('@hapi/lab')
const Hapi = require('@hapi/hapi')
const { expect } = require('@hapi/code')

let server

const { describe, it, beforeEach } = (exports.lab = Lab.script())

describe('shortcut methods for status codes:', () => {
  beforeEach(async () => {
    server = new Hapi.Server()
    await server.initialize()

    await server.register({
      plugin: require('../lib/index')
    })
  })

  describe('h.ok ->', () => {
    it('responds with status 200 and empty payload', async () => {
      server.route({
        path: '/',
        method: 'GET',
        handler: (_, h) => h.ok()
      })

      const request = {
        url: '/',
        method: 'GET'
      }

      const response = await server.inject(request)
      expect(response.statusCode).to.equal(200)
      expect(response.payload).to.be.empty()
    })

    it('responds with status 200 and payload', async () => {
      server.route({
        path: '/',
        method: 'GET',
        handler: (_, h) => h.ok({ works: 'fine' })
      })

      const request = {
        url: '/',
        method: 'GET'
      }

      const response = await server.inject(request)
      expect(response.statusCode).to.equal(200)
      expect(JSON.parse(response.payload)).to.equal({ works: 'fine' })
    })
  })

  describe('h.created ->', () => {
    it('responds with status 201 and empty payload', async () => {
      server.route({
        path: '/',
        method: 'GET',
        handler: (_, h) => h.created()
      })

      const request = {
        url: '/',
        method: 'GET'
      }

      const response = await server.inject(request)
      expect(response.statusCode).to.equal(201)
      expect(response.payload).to.be.empty()
    })

    it('responds with status 201 and payload', async () => {
      server.route({
        path: '/',
        method: 'GET',
        handler: (_, h) => h.created({ created: 'marcus' })
      })

      const request = {
        url: '/',
        method: 'GET'
      }

      const response = await server.inject(request)
      expect(response.statusCode).to.equal(201)
      expect(JSON.parse(response.payload)).to.equal({ created: 'marcus' })
    })
  })

  describe('h.accepted ->', () => {
    it('responds with status 202 and empty payload', async () => {
      server.route({
        path: '/',
        method: 'GET',
        handler: (_, h) => h.accepted()
      })

      const request = {
        url: '/',
        method: 'GET'
      }

      const response = await server.inject(request)
      expect(response.statusCode).to.equal(202)
      expect(response.payload).to.be.empty()
    })

    it('responds with status 202 and payload', async () => {
      server.route({
        path: '/',
        method: 'GET',
        handler: (_, h) => h.accepted({ link: 'futurestud.io' })
      })

      const request = {
        url: '/',
        method: 'GET'
      }

      const response = await server.inject(request)
      expect(response.statusCode).to.equal(202)
      expect(JSON.parse(response.payload)).to.equal({ link: 'futurestud.io' })
    })
  })

  describe('h.nonAuthoritativeInformation ->', () => {
    it('responds with status 203 and empty payload', async () => {
      server.route({
        path: '/',
        method: 'GET',
        handler: (_, h) => h.nonAuthoritativeInformation()
      })

      const request = {
        url: '/',
        method: 'GET'
      }

      const response = await server.inject(request)
      expect(response.statusCode).to.equal(203)
      expect(response.payload).to.be.empty()
    })

    it('responds with status 203 and payload', async () => {
      server.route({
        path: '/',
        method: 'GET',
        handler: (_, h) => h.nonAuthoritativeInformation({ like: 'woop-woop' })
      })

      const request = {
        url: '/',
        method: 'GET'
      }

      const response = await server.inject(request)
      expect(response.statusCode).to.equal(203)
      expect(JSON.parse(response.payload)).to.equal({ like: 'woop-woop' })
    })
  })

  describe('h.noContent ->', () => {
    it('responds with status 204 and ignores payload', async () => {
      server.route({
        path: '/',
        method: 'GET',
        handler: (_, h) => h.noContent({ ignores: 'payload' })
      })

      const request = {
        url: '/',
        method: 'GET'
      }

      const response = await server.inject(request)
      expect(response.statusCode).to.equal(204)
      expect(response.payload).to.be.empty()
    })
  })

  describe('h.resetContent ->', () => {
    it('responds with status 205 and ignores payload', async () => {
      server.route({
        path: '/',
        method: 'GET',
        handler: (_, h) => h.resetContent({ ignores: 'payload' })
      })

      const request = {
        url: '/',
        method: 'GET'
      }

      const response = await server.inject(request)
      expect(response.statusCode).to.equal(205)
      expect(response.payload).to.be.empty()
    })
  })

  describe('h.partialContent ->', () => {
    it('responds with status 206 and empty payload', async () => {
      server.route({
        path: '/',
        method: 'GET',
        handler: (_, h) => h.partialContent()
      })

      const request = {
        url: '/',
        method: 'GET'
      }

      const response = await server.inject(request)
      expect(response.statusCode).to.equal(206)
      expect(response.payload).to.be.empty()
    })

    it('responds with status 206 and payload', async () => {
      server.route({
        path: '/',
        method: 'GET',
        handler: (_, h) => h.partialContent({ partial: 'content' })
      })

      const request = {
        url: '/',
        method: 'GET'
      }

      const response = await server.inject(request)
      expect(response.statusCode).to.equal(206)
      expect(JSON.parse(response.payload)).to.equal({ partial: 'content' })
    })
  })
})
