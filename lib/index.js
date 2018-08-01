'use strict'

async function register (server) {
  server.decorate('toolkit', 'pdf', function (pdf, filename) {
    return this.response(pdf)
      .type('application/pdf')
      .header('Content-Description', 'File Transfer')
      .header('Content-Disposition', `attachment; filename="${filename}"`)
      .header('Content-Transfer-Encoding', 'binary')
  })

  server.decorate('toolkit', 'status', function (code) {
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
