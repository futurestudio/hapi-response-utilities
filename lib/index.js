'use strict'

async function register (server) {
  /**
   * Creates a PDF response including the PDF
   * related content type and HTTP headers
   * allowing a custom filename.
   */
  server.decorate('toolkit', 'pdf', function (pdf, filename = 'download.pdf') {
    return this.response(pdf)
      .type('application/pdf')
      .header('Content-Description', 'File Transfer')
      .header('Content-Disposition', `attachment; filename="${filename}"`)
      .header('Content-Transfer-Encoding', 'binary')
  })

  /**
   * Sets a cookie by the given key-value-pair.
   */
  server.decorate('toolkit', 'cookie', function (key, value, options) {
    this.state(key, value, options)

    return this
  })

  /**
   * Shortcut to respond with just an
   * HTTP status code.
   */
  server.decorate('toolkit', 'status', function (code) {
    return this.response().code(code)
  })

  server.decorate('toolkit', 'ok', function (payload) {
    return this.response(payload).code(200)
  })

  server.decorate('toolkit', 'created', function (payload) {
    return this.response(payload).code(201)
  })

  server.decorate('toolkit', 'accepted', function (payload) {
    return this.response(payload).code(202)
  })

  server.decorate('toolkit', 'nonAuthoritativeInformation', function (payload) {
    return this.response(payload).code(203)
  })

  server.decorate('toolkit', 'noContent', function () {
    return this.response().code(204)
  })

  server.decorate('toolkit', 'resetContent', function () {
    return this.response().code(205)
  })

  server.decorate('toolkit', 'partialContent', function (payload) {
    return this.response(payload).code(206)
  })
}

exports.plugin = {
  register,
  once: true,
  pkg: require('../package.json')
}
