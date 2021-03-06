<div align="center">
  <img width="471" style="max-width:100%;" src="https://github.com/futurestudio/hapi-response-utilities/blob/master/media/hapi-response-utilities.png?raw=true" alt="hapi-response-utilities logo">
  <br/>
  <br/>
  <p>
    hapi response decorations to conveniently compose responses
  </p>
  <br/>
  <p>
    <a href="#installation"><strong>Installation</strong></a> ·
    <a href="#usage"><strong>Usage</strong></a> ·
    <a href="#methods"><strong>Methods</strong></a>
  </p>
  <br/>
  <br/>
  <p>

[![Build Status](https://travis-ci.org/futurestudio/hapi-response-utilities.svg?branch=master)](https://travis-ci.org/futurestudio/hapi-response-utilities)
  <a href="https://snyk.io/test/github/futurestudio/hapi-response-utilities"><img src="https://snyk.io/test/github/futurestudio/hapi-response-utilities/badge.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/futurestudio/hapi-response-utilities" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/hapi-response-utilities"><img src="https://img.shields.io/npm/v/hapi-response-utilities.svg" alt="hapi-response-utilities Version"></a>
    <a href="https://www.npmjs.com/package/hapi-response-utilities"><img src="https://img.shields.io/npm/dm/hapi-response-utilities.svg" alt="Monthly downloads"></a>
  </p>
  <p>
    <em>Follow <a href="http://twitter.com/marcuspoehls">@marcuspoehls</a> for updates!</em>
  </p>
</div>

------

<p align="center"><sup>Development of this hapi plugin is supported by <a href="https://futurestud.io">Future Studio University 🚀</a></sup>
<br><b>
Join the <a href="https://futurestud.io/university">Future Studio University and Skyrocket in Node.js</a></b>
</p>

------


## Introduction
A hapi plugin that decorates the response toolkit `h` with methods to conveniently compose responses.


## Requirements
> **hapi v19 (or later)** and **Node.js v12 (or newer)**

This plugin requires **hapi v19** (or later) and **Node.js v12 or newer**.


### Compatibility
| Major Release | [hapi.js](https://github.com/hapijs/hapi) version | Node.js version |
| --- | --- | --- |
| `v2` | `>=17 hapi` | `>=12` |
| `v1` | `>=17 hapi` | `>=8` |


## Installation
Add `hapi-response-utilities` as a dependency to your project:

```bash
npm i hapi-response-utilities
```


## Usage
Register `hapi-response-utilities` to your hapi server and that's it :)

```js
await server.register({
  plugin: require('hapi-response-utilities')
})

// went smooth like hot chocolate :)
```


## Methods
An overview of available hapi `toolkit` decorations.


#### h.pdf(pdf-content, filename)
Creates a PDF response including the PDF related content type and HTTP headers allowing a custom filename.

The `filename` defaults to `download`.

```js
handler: async (_, h) => {
  const content = await createPdfContent()
  return h.pdf(content, 'filename.pdf')
}
```


#### h.status(code)
Shortcut to respond with just an HTTP status code.

```js
handler: (_, h) => {
  return h.status(204)
}
```


#### h.cookie(key, value, options)
Sets a cookie for the given key-value-pair. It's a convenience method for `h.state`.

```js
handler: (_, h) => {
  return
    h.cookie('userId', '1')
     .cookie('username', 'Marcus')
     .continue
}
```


#### h.header(key, value, options)
Set a response header for the given key-value-pair. This method provides a unified interface to set response headers, no matter if the response is a hapi response object or a boom error instance:

```js
handler: (_, h) => {
  return h
    .header('content-type', 'text/html')
    .header('api-key', 'secret-api-key')
    .continue
}
```

The accepted [`options`](https://hapi.dev/api/?v=18.4.0#-responseheadername-value-options) are the same as provided by hapi itself.


#### h.headers()
Returns an object containing the response headers. This method provides a unified interface to set response headers, no matter if the response is a hapi response object or a boom error instance:

```js
handler: (_, h) => {
  const responseHeaders = h.headers()

  return h.continue
}
```


#### h.isView()
Determines whether the response is a rendered view:

```js
handler: (_, h) => {
  if (h.isView()) {
    // handle view response
  }

  return h.continue
}
```


## Feature Requests
Do you miss a feature? Please don’t hesitate to
[create an issue](https://github.com/futurestudio/hapi-response-utilities/issues) with a short description of your desired addition to this plugin.


## Links & Resources

- [hapi tutorial series](https://futurestud.io/tutorials/hapi-get-your-server-up-and-running) with 100+ tutorials


## Contributing

1.  Create a fork
2.  Create your feature branch: `git checkout -b my-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request 🚀


## License

MIT © [Future Studio](https://futurestud.io)

---

> [futurestud.io](https://futurestud.io) &nbsp;&middot;&nbsp;
> GitHub [@futurestudio](https://github.com/futurestudio/) &nbsp;&middot;&nbsp;
> Twitter [@futurestud_io](https://twitter.com/futurestud_io)
