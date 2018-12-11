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

  server.decorate('toolkit', 'image', function (type, file) {
    return this.response(file)
      .type(`image/${type}`)
      .header('Content-Disposition', 'inline')
  })

  server.decorate('toolkit', 'png', function (file) {
    return this.image('png', file)
  })

  server.decorate('toolkit', 'jpeg', function (file) {
    return this.image('jpeg', file)
  })

  server.decorate('toolkit', 'gif', function (file) {
    return this.image('gif', file)
  })

  server.decorate('toolkit', 'webp', function (file) {
    return this.image('webp', file)
  })

  server.decorate('toolkit', 'bmp', function (file) {
    return this.image('bmp', file)
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

  /**
   * Shortcut for a 200 OK response.
   */
  server.decorate('toolkit', 'ok', function (payload) {
    return this.response(payload).code(200)
  })

  /**
   * Shortcut for a 201 Created response.
   */
  server.decorate('toolkit', 'created', function (payload) {
    return this.response(payload).code(201)
  })

  /**
   * Shortcut for a 202 Accepted response.
   */
  server.decorate('toolkit', 'accepted', function (payload) {
    return this.response(payload).code(202)
  })

  /**
   * Shortcut for a 203 Non-authoritative Information response.
   */
  server.decorate('toolkit', 'nonAuthoritativeInformation', function (payload) {
    return this.response(payload).code(203)
  })

  /**
   * Shortcut for a 204 No Content response.
   */
  server.decorate('toolkit', 'noContent', function () {
    return this.response().code(204)
  })

  /**
   * Shortcut for a 205 Reset Content response.
   */
  server.decorate('toolkit', 'resetContent', function () {
    return this.response().code(205)
  })

  /**
   * Shortcut for a 206 Partial Content response.
   */
  server.decorate('toolkit', 'partialContent', function (payload) {
    return this.response(payload).code(206)
  })
}

exports.plugin = {
  register,
  once: true,
  pkg: require('../package.json')
}
