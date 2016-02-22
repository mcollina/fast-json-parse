# fast-json-parse

[![Build Status](https://travis-ci.org/mcollina/fast-json-parse.svg)](https://travis-ci.org/mcollina/fast-json-parse)

The fastest way to parse JSON safely.

## Install

```
npm i fast-json-parse --save
```

## Usage

Depending on your application, the constructor mode can be faster or
slower.

### function

```js
'use strict'

var parse = require('fast-json-parse')
var fs = require('fs')

var result = parse(fs.readFileSync('./package.json'))

if (result.err) {
  // unable to parse json
  console.log(err.message)
} else {
  console.log('json parsed successfully')
}
```

### constructor

```js
'use strict'

var Parse = require('fast-json-parse')
var fs = require('fs')

var result = new Parse(fs.readFileSync('./package.json'))

if (result.err) {
  // unable to parse json
  console.log(err.message)
} else {
  console.log('json parsed successfully')
}
```

## Acknowledgements

fast-json-parse is sponsored by [nearForm](http://nearform.com).

## License

MIT
