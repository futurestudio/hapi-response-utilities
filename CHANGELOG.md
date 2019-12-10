# Changelog


## Version [1.6.0](https://github.com/futurestudio/hapi-response-utilities/compare/v1.5.0...v1.6.0) - 2019-12-xx

### Added
- `.isView()`: determine whether the response is a rendered view
- `.headers()`: provides a unified interface returning the response headers (no matter if hapi resonse or boom error)
- `.header(key, value, options)`: provides a unified interface to set response headers. Works for both, a hapi response object or a boom error

### Updated
- bump dependencies


## Version [1.5.0](https://github.com/futurestudio/hapi-response-utilities/compare/v1.4.1...v1.5.0) - 2019-10-12

### Added
- basic TypeScript declarations in `lib/index.d.ts`


## Version [1.4.1](https://github.com/futurestudio/hapi-response-utilities/compare/v1.4.0...v1.4.1) - 2019-10-12

### Updated
- bump dependencies


## Version [1.4.0](https://github.com/futurestudio/hapi-response-utilities/compare/v1.3.4...v1.4.0) - 2019-07-24

### Added
- `.redirectWithPayload(path)`: temporary redirect with HTTP status 307 (keeps the HTTP method)
- `.permanentRedirectWithPayload(path)`: permanent redirect with HTTP status 308 (keeps the HTTP method)

### Updated
- bump dependencies


## Version [1.3.4](https://github.com/futurestudio/hapi-response-utilities/compare/v1.3.3...v1.3.4) - 2019-04-24

### Updated
- bump dependencies
- update to hapi scoped dependencies


## Version [1.3.3](https://github.com/futurestudio/hapi-response-utilities/compare/v1.3.2...v1.3.3) - 2019-02-18

### Updated
- bump dependencies
- fix badges in Readme


## Version [1.3.2](https://github.com/futurestudio/hapi-response-utilities/compare/v1.3.1...v1.3.2) - 2019-01-26

### Updated
- Readme: rename GitHub references `futurestudio -> futurestudio`


## Version [1.3.1](https://github.com/futurestudio/hapi-response-utilities/compare/v1.3.0...v1.3.1) - 2019-01-22

### Updated
- bump dependencies
- test plugin for hapi 18


## [1.3.0](https://github.com/futurestudio/hapi-response-utilities/compare/v1.2.0...v1.3.0) - 2019-01-09

### Added
- `h.permanentRedirect(path)`: sends a redirect with HTTP status code for permanently moved `301`


## [1.2.0](https://github.com/futurestudio/hapi-response-utilities/compare/v1.1.0...v1.2.0) - 2018-11-14

### Added
- Shortcut methods that set the related status code:
  - `h.ok`: `200`
  - `h.created`: `201`
  - `h.accepted`: `202`
  - `h.nonAuthoritativeInformation`: `203`
  - `h.noContent`: `204`
  - `h.resetContent`: `205`
  - `h.partialContent`: `206`

## Updated
- bump devDependencies


## [1.1.0](https://github.com/futurestudio/hapi-response-utilities/compare/v1.0.1...v1.1.0) - 2018-11-12

### Updated
- `.cookie()` function returns the response toolkit instead of `undefined`
- Readme: add logo
- Readme: example code snippets
- Run tests for Node versions 8, 10, and 11
- Bump dependencies


## [1.0.1](https://github.com/futurestudio/hapi-response-utilities/compare/v1.0.0...v1.0.1) - 2018-08-21

### Updated
- Readme: quick navigation


## 1.0.0 - 2018-08-02

### Added
- `1.0.0` release 🚀 🎉
