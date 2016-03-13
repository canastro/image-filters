![build status](https://travis-ci.org/canastro/image-filters.svg?branch=master)
[![npm version](https://badge.fury.io/js/image-filters.svg)](https://badge.fury.io/js/image-filters)

# Work in progress

# image-filters

Small library to apply a filters to a image.

This library is wrapper around the following smaller libraries:
* [image-brightness](https://www.npmjs.com/package/image-brightness)
* [image-contrast](https://www.npmjs.com/package/image-contrast)
* [image-filter-grayscale](https://www.npmjs.com/package/image-filter-grayscale)
* [image-filter-threshold](https://www.npmjs.com/package/image-filter-threshold)
* [image-filter-sepia](https://www.npmjs.com/package/image-filter-sepia)
* [image-filter-invert](https://www.npmjs.com/package/image-filter-invert)
* [image-filter-gamma](https://www.npmjs.com/package/image-filter-gamma)
* [image-filter-colorize](https://www.npmjs.com/package/image-filter-colorize)

So if you want to use only one or two of these filters you might be better of just including them directly.

## Install

```
npm install image-filters --save
```

## Usage
At the moment there are two ways of usage, you either provide a image or you provide a canvas imageData.

### Initialization:
```js
var imageFilter = require('image-filter');

//from a image element
//target is not mandatory
var elementOne = new ImageFilter({
    from: '#original'
});

//from image data
//target is not mandatory
var elementTwo = new ImageFilter({
    imageData: imageData
});

//from url
//target is not mandatory
var elementThree = new ImageFilter({
    url: "http://lorempixel.com/400/200"
});
```

### Apply filters:

```js
imageFilter
    .contrast({
        contrast: 50
    })
    .brightness({
        adjustment: 50
    });
```

### Get results:
Every transformation will return as imageData, but you have the possibility to get the result appended to the DOM.

```js
//append to html
imageFilter.append('#target');
```
