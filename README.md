<div align="center">
  <img width="471" style="max-width:100%;" src="https://github.com/fs-opensource/hapi-response-utilities/blob/master/media/hapi-response-utilities.png?raw=true" alt="hapi-response-utilities logo">
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

[![Build Status](https://travis-ci.org/fs-opensource/hapi-response-utilities.svg?branch=master)](https://travis-ci.org/fs-opensource/hapi-response-utilities)
  <a href="https://snyk.io/test/github/fs-opensource/hapi-response-utilities"><img src="https://snyk.io/test/github/fs-opensource/hapi-response-utilities/badge.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/fs-opensource/hapi-response-utilities" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/hapi-response-utilities"><img src="https://img.shields.io/npm/v/hapi-response-utilities.svg" alt="hapi-response-utilities Version" data-canonical-src="https://img.shields.io/npm/v/hapi-response-utilities.svg" style="max-width:100%;"></a>
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
A hapi plugin that decorates the response toolkit `h` with methods to quickly and conveniently compose responses.


### Requirements
This plugin uses async/await which requires **Node.js v8 or newer**.


## Installation
Add `hapi-response-utilities` as a dependency to your project:

```bash
# NPM 5: this way is yours
npm i hapi-response-utilities

# NPM 4:
npm i -S hapi-response-utilities
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
Sets a cookie by the given key-value-pair. It's a convenience method for `h.state`.

```js
handler: (_, h) => {
  return
    h.cookie('userId', '1')
     .cookie('username', 'Marcus')
     .continue
}
```


## Feature Requests
Do you miss a feature? Please don’t hesitate to
[create an issue](https://github.com/fs-opensource/hapi-response-utilities/issues) with a short description of your desired addition to this plugin.


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
> GitHub [@fs-opensource](https://github.com/fs-opensource/) &nbsp;&middot;&nbsp;
> Twitter [@futurestud_io](https://twitter.com/futurestud_io)
