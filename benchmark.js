'use strict'

var benchmark = require('benchmark')
var suite = new benchmark.Suite()
var fs = require('fs')
var myData = fs.readFileSync('./package.json')
var Parse = require('./')
var safe = require('json-parse-safe')
var max = 100

var parseJSON = {}
parseJSON._err = null
parseJSON._value = null

Object.defineProperty(parseJSON, 'data', {
  enumerable: false,
  get: function () {
    throw new Error('no getter for data')
  },
  set: function (key) {
    try {
      this._value = JSON.parse(key)
    } catch (err) {
      this._err = err
    }
    return key
  }
})

Object.defineProperty(parseJSON, 'err', {
  enumerable: false,
  get: function () {
    var result = this._err
    this._err = null
    return result
  }
})

Object.defineProperty(parseJSON, 'value', {
  enumerable: false,
  get: function () {
    var result = this._value
    this._value = null
    return result
  }
})

function literal (data) {
  var result = {
    err: null,
    value: null
  }

  try {
    result.value = JSON.parse(data)
  } catch (err) {
    result.err = err
  }

  return result
}

function doSomething (data) {
  var count = 0
  var keys = Object.keys(data)
  for (var i = 0; i < keys.length; i++) {
    count++
  }
}

suite.add('literal', function literalBench () {
  var parsed = literal(myData)
  if (parsed.err) {
    return
  }

  // add a loop to simulate some activity here
  for (var i = 0; i < max; i++) {
    doSomething(parsed.value)
  }
})

suite.add('Parse class', function parseBench () {
  var parsed = new Parse(myData)
  if (parsed.err) {
    return
  }

  // add a loop to simulate some activity here
  for (var i = 0; i < max; i++) {
    doSomething(parsed.value)
  }
})

suite.add('Parse wrapped', function parseBench () {
  var parsed = Parse(myData)
  if (parsed.err) {
    return
  }

  // add a loop to simulate some activity here
  for (var i = 0; i < max; i++) {
    doSomething(parsed.value)
  }
})

suite.add('json-parse-safe', function parseBench () {
  var parsed = safe(myData)
  if (parsed.err) {
    return
  }

  // add a loop to simulate some activity here
  for (var i = 0; i < max; i++) {
    doSomething(parsed.value)
  }
})

suite.add('setter', function parseBench () {
  parseJSON.data = myData
  if (parseJSON.err) {
    return
  }

  var value = parseJSON.value

  // add a loop to simulate some activity here
  for (var i = 0; i < max; i++) {
    doSomething(value)
  }
})

suite.add('try catch here', function tryCatchBench () {
  var data = null
  try {
    data = JSON.parse(myData)
  } catch (err) {
    return
  }

  // add a loop to simulate some activity here
  for (var i = 0; i < max; i++) {
    doSomething(data)
  }
})

suite.on('complete', function print () {
  for (var i = 0; i < this.length; i++) {
    console.log(this[i].toString())
  }

  console.log('Fastest is', this.filter('fastest').map('name')[0])
})

suite.run()
