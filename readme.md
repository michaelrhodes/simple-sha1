# simple-sha1
simple-sha1 wraps two fast SHA1 implementations, and exposes a simple api for generating hashes in node ([crypto](http://nodejs.org/api/crypto.html)) and the browser ([Rusha](https://github.com/srijs/rusha)).

[![Build status](https://travis-ci.org/michaelrhodes/simple-sha1.png?branch=master)](https://travis-ci.org/michaelrhodes/simple-sha1)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/simple-sha1.svg)](https://saucelabs.com/u/simple-sha1)

## install
```sh
$ npm install simple-sha1
```

## example
```js
var sha1 = require('simple-sha1')

console.log(sha1.sync('simple-sha1'))
> e6b180cd95b3dc67e8f1be093aea584c623f44ee
```

## license
[MIT](http://opensource.org/licenses/MIT)
