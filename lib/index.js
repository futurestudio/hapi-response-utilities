'use strict'

async function register (server) {
  /**
   * Creates a PDF response including the PDF
   * related content type and HTTP headers
   * allowing a custom filename.
   */
  server.decorate('toolkit', 'pdf', function (pdf, filename = 'download') {
    return this.response(pdf)
      .type('application/pdf')
      .header('Content-Description', 'File Transfer')
      .header('Content-Disposition', `attachment; filename="${filename}"`)
      .header('Content-Transfer-Encoding', 'binary')
  })

  /**
   * Shortcut to respond with just an
   * HTTP status code.
   */
  server.decorate('toolkit', 'status', function (code) {
    return this.response().code(code)
  })

  /**
   * Sets a cookie by the given key-value-pair.
   */
  server.decorate('toolkit', 'cookie', function (key, value, options) {
    return this.state(key, value, options)
  })
}

exports.plugin = {
  register,
  once: true,
  pkg: require('../package.json')
}
