# This is not actively maintained

![build status](https://travis-ci.org/canastro/image-filters.svg?branch=master)
[![npm version](https://badge.fury.io/js/image-filters.svg)](https://badge.fury.io/js/image-filters)
[![codecov](https://codecov.io/gh/canastro/image-filters/branch/master/graph/badge.svg)](https://codecov.io/gh/canastro/image-filters)

# image-filters

Small library to apply a transformations to a image relying on `image-filter-core` handle the transformation and distribute work with webworkers.

This library is wrapper around the following smaller libraries:
* [image-filter-brightness](https://www.npmjs.com/package/image-filter-brightness)
* [image-filter-color](https://www.npmjs.com/package/image-filter-color)
* [image-filter-colorize](https://www.npmjs.com/package/image-filter-colorize)
* [image-filter-contrast](https://www.npmjs.com/package/image-filter-contrast)
* [image-filter-gamma](https://www.npmjs.com/package/image-filter-gamma)
* [image-filters](https://www.npmjs.com/package/image-filters)
* [image-filter-invert](https://www.npmjs.com/package/image-filter-invert)
* [image-filter-sepia](https://www.npmjs.com/package/image-filter-sepia)
* [image-filter-threshold](https://www.npmjs.com/package/image-filter-threshold)

So if you want to use only one or two of these filters you might be better of just including them directly.

## Install

```
npm install image-filters --save
```

## Usage
At the moment there are three ways of usage, img element, imageData or url:
### Initialization:
```js
var imageFilter = require('image-filters');

// from a image element
var elementOne = new ImageFilter({ from: '#original' }, nWorkers);

// from image data
var elementTwo = new ImageFilter({ imageData: imageData }, nWorkers);

// from url
var elementThree = new ImageFilter({ url: "http://lorempixel.com/400/200" }, nWorkers);
```

### Apply filters:

```js
imageFilter
    .contrast({ contrast: 50 })
    .brightness({ adjustment: 50 });
```

### Get results:
Every transformation will return as imageData, but you have the possibility to get the result appended to the DOM.

```js
//append to html
imageFilter.append('#target');
```

## Development
To run the samples in this module please run `npm run build && npm run serve` and then access `http://127.0.0.1:8080/simple/` or `http://127.0.0.1:8080/editor/`
