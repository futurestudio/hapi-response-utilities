<p align="center">
  hapi-response-utilities
</p>

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
Text

```js
handler: async (_, h) => {
  const content = await createPdfContent()
  return h.pdf(content, 'hapi-response-utilities')
}
```


#### h.status(code)
Text

```js
handler: (_, h) => {
  return h.status(204)
}
```


#### h.cookie(keys)
Text

```js
handler: (_, h) => {
  h.cookie('userId', '1')
  h.cookie('username', 'Marcus')
  return h.response()
}
```


## Feature Requests
Do you miss a feature? Please don’t hesitate to
[create an issue](https://github.com/fs-opensource/hapi-response-utilities/issues) with a short description of your desired addition to this plugin.


## Links & Resources

- [hapi tutorial series](https://futurestud.io/tutorials/hapi-get-your-server-up-and-running) with 90+ tutorials


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
