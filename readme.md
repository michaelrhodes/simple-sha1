# simple-sha1
simple-sha1 wraps two fast SHA1 implementations, and exposes a simple api for generating hashes in node ([crypto](http://nodejs.org/api/crypto.html)) and the browser ([Rusha](https://github.com/srijs/rusha)).

## install
```sh
$ npm install simple-sha1
```

## example
```js
var sha1 = require('simple-sha1')

console.log(sha1('simple-sha1'))
> e6b180cd95b3dc67e8f1be093aea584c623f44ee
```

## license
[MIT](http://opensource.org/licenses/MIT)
