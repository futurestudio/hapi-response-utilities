'use strict'

async function register (server) {
  server.decorate('toolkit', 'sendStatus', function (code) {
    return this.response().code(code)
  })

  server.decorate('toolkit', 'cookie', function (key, value, options) {
    return this.state(key, value, options)
  })
}

exports.plugin = {
  register,
  pkg: require('../package.json'),
  once: true
}
