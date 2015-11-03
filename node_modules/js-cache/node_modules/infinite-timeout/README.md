# Infinite timeout library for JavaScript and Node.js

Native setTimeout functions are limited to INT32 (2147483647 milliseconds or roughly 24.8 days). This library makes it possible to set timeouts with a nearly unlimited delay.

## Usage in Node.js  

**Set timeout**  

```
var timeout = require('infinite-timeout');
timeout.set(function(){
    console.log('This took 30 days');
}, 2592000000);
```

**Clear timeout**  

```
var timeout = require('infinite-timeout');
var id = timeout.set(callback, delay);
timeout.clear(id);
```

## Usage in browsers

**Load script**  

```
<script src="lib/timeout.js"></script> 
```

**Set timeout**  

```
timeout.set(function(){
    console.log('This took 30 days');
}, 2592000000);
```

**Clear timeout**  

```
var id = timeout.set(callback, delay);
timeout.clear(id);
```

## Developing

The library is published to NPM and can be installed with the following command:

    $ npm install infinite-timeout

## Testing

Navigate to this module's repository and make sure you have the development modules installed:

    $ npm install


Run the tests:

    $ npm test

