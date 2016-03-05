# image-filters

Small library to apply a filters to a image.

This library is wrapper around the following smaller libraries:
* [image-brightness](https://www.npmjs.com/package/image-brightness)
* [image-contrast](https://www.npmjs.com/package/image-contrast)
* [image-filter-grayscale](https://www.npmjs.com/package/image-filter-grayscale)
* [image-filter-threshold](https://www.npmjs.com/package/image-filter-threshold)

So if you want to use only one or two of these filters you might be better of just including them directly.

## Install

```
npm install image-filters --save
```

## Usage
At the moment there are two ways of usage, you either provide a image or you provide a canvas imageData.

### From image:

JS file:
```js
var imageFilter = require('image-filter');

//from a image element
//target is not mandatory
var elementOne = new ImageFilter({
    from: '#original',
    to: '#target-1'
});

//from image data
//target is not mandatory
var elementTwo = new ImageFilter({
    imageData: imageData,
    to: '#target-2'
});

//from url
//target is not mandatory
var elementThree = new ImageFilter({
    url: "http://lorempixel.com/400/200",
    to: '#target-3'
});

//select filter
var filter = 'contrast'; //contrast, brightness, grayscale, threshold

//call apply filter with the
//filter and options necessary to run the selected filter
var resultOne = elementOne.applyFilter(filter, options);
var resultTwo = elementTwo.applyFilter(filter, options);
var resultThree = elementThree.applyFilter(filter, options);
```
