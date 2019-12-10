'use strict'

async function register (server) {
  /**
   * Creates a PDF response forcing the browser to download the PDF file.
   *
   * @returns {Response}
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
   *
   * @returns {Toolkit}
   */
  server.decorate('toolkit', 'cookie', function (key, value, options) {
    this.state(key, value, options)

    return this
  })

  /**
   * Sets a cookie by the given key-value-pair.
   *
   * @returns {Response}
   */
  server.decorate('toolkit', 'header', function (key, value, options) {
    const response = this.request.response

    if (!response) {
      throw new Error(`Cannot assign response headers [${key}/${value}] at this point, no response available yet (too early in the request lifecycle)`)
    }

    if (!response.isBoom) {
      response.header(key, value, options)

      return this
    }

    key = key.toLowerCase()
    const { headers } = response.output
    const { append = false, separator = ',', override = true, duplicate = true } = options || {}

    if ((!append && override) || !headers[key]) {
      headers[key] = value
    } else if (override) {
      if (key === 'set-cookie') {
        headers[key] = [].concat(headers[key], value)
      } else {
        if (!duplicate) {
          const values = headers[key].split(separator)

          for (const v of values) {
            if (v === value) {
              return this
            }
          }
        }

        headers[key] = headers[key] + separator + value
      }
    }

    return this
  })

  /**
   * Returns the response headers.
   *
   * @returns {Object}
   */
  server.decorate('toolkit', 'headers', function () {
    const response = this.request.response

    if (!response) {
      throw new Error('Cannot return response headers at this point, no response available yet (too early in the request lifecycle)')
    }

    return response.isBoom
      ? response.output.headers
      : response.headers
  })

  /**
   * Determine whether the response is a view.
   *
   * @returns {Boolean}
   */
  server.decorate('toolkit', 'isView', function () {
    const response = this.request.response || {}

    return response.variety === 'view'
  })

  /**
   * Redirect the given `path` with HTTP status 301.
   *
   * @returns {Response}
   */
  server.decorate('toolkit', 'permanentRedirect', function (path) {
    return this.redirect(path).code(301)
  })

  /**
   * Temporarily redirect the requested `path` with HTTP status 307.
   * Details: https://developer.mozilla.org/de/docs/Web/HTTP/Status
   *
   * @returns {Response}
   */
  server.decorate('toolkit', 'redirectWithPayload', function (path) {
    return this.redirect(path).code(307)
  })

  /**
   * Permanently redirect the requested `path` with HTTP status 308.
   * Details: https://developer.mozilla.org/de/docs/Web/HTTP/Status
   *
   * @returns {Response}
   */
  server.decorate('toolkit', 'permanentRedirectWithPayload', function (path) {
    return this.redirect(path).code(308)
  })

  /**
   * Shortcut to respond with just an HTTP status code.
   *
   * @returns {Response}
   */
  server.decorate('toolkit', 'status', function (code) {
    return this.response().code(code)
  })

  /**
   * Shortcut for a 200 OK response.
   *
   * @returns {Response}
   */
  server.decorate('toolkit', 'ok', function (payload) {
    return this.response(payload).code(200)
  })

  /**
   * Shortcut for a 201 Created response.
   *
   * @returns {Response}
   */
  server.decorate('toolkit', 'created', function (payload) {
    return this.response(payload).code(201)
  })

  /**
   * Shortcut for a 202 Accepted response.
   *
   * @returns {Response}
   */
  server.decorate('toolkit', 'accepted', function (payload) {
    return this.response(payload).code(202)
  })

  /**
   * Shortcut for a 203 Non-authoritative Information response.
   *
   * @returns {Response}
   */
  server.decorate('toolkit', 'nonAuthoritativeInformation', function (payload) {
    return this.response(payload).code(203)
  })

  /**
   * Shortcut for a 204 No Content response.
   *
   * @returns {Response}
   */
  server.decorate('toolkit', 'noContent', function () {
    return this.response().code(204)
  })

  /**
   * Shortcut for a 205 Reset Content response.
   *
   * @returns {Response}
   */
  server.decorate('toolkit', 'resetContent', function () {
    return this.response().code(205)
  })

  /**
   * Shortcut for a 206 Partial Content response.
   *
   * @returns {Response}
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
