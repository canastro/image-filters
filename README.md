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

So if you want to use only one or two of these filters you might be better off just including them directly.

## Install

```
npm install image-filters --save
```

## Usage
At the moment there are three ways of usage, img element, imageData or url:
### Initialization:
```js
var imageFilter = require('image-filters');
// OR >ES6
import ImageFilter from "image-filters";

// from a image element
var imageFilter = new ImageFilter({ from: '#original' }, nWorkers);

// from image data
var imageFilter = new ImageFilter({ imageData: imageData }, nWorkers);

// from url
var imageFilter = new ImageFilter({ url: "http://lorempixel.com/400/200" }, nWorkers);
```

### Apply filters:

```js
imageFilter
    .contrast({ contrast: 50 })
    .brightness({ adjustment: 50 });
```

### Available filter functions
```js
// contrast, brightness and threshold accept values in the range 0-255
.contrast({contrast: 50});
.brightness({adjustment: 50});
.threshold({ threshold: 30 });
	
// grayscale, sepia and invert do not accept value
.grayscale();
.sepia();
.invert();

// colorize accepts an obect parameter with a value color in HEX and a level value in the range 0-100
.colorize({ color: '#008080', level: 50 });
```

### Get results:
When you added the filters to the imageFilter object, you need to apply them. The apply function will return a Promise.

```js
imageFilter.apply().then(function (imageData) {
	console.log(imageData);
	// To have DataURL
	console.log(imageFilterCore.convertImageDataToCanvasURL(imageData));
})
```

You also have the possibility to get the result appended to the DOM as an img element, without needing to call the apply function beforehand

```js
// append to html
imageFilter.append('#target');
```

## Development
To run the samples in this module please run `npm run build && npm run serve` and then access `http://127.0.0.1:8080/simple/` or `http://127.0.0.1:8080/editor/`
