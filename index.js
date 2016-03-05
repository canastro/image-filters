var imageFilterContrast = require('image-contrast');
var imageFilterBrightness = require('image-brightness');
var imageFilterGrayscale = require('image-filter-grayscale');

var FILTER_CONFIG = {
    'CONTRAST': imageFilterContrast,
    'BRIGHTNESS': imageFilterBrightness,
    'GRAYSCALE': imageFilterGrayscale
};

function getImageElement(selector) {
    var element = document.querySelectorAll(selector)[0];

    if (!element) {
        throw new Error('image-filters:: no "from" element found');
    }

    return element;
}

function getImageData(context, element) {

    if (element.tagName !== 'IMG') {
        throw new Error('image-filters:: invalid origin');
    }

    context.drawImage(element, 0, 0 );
    return context.getImageData(0, 0, element.width, element.height);
}

function appendResult(selector, src) {

    var target;
    var image;

    if (!selector) {
        return;
    }

    target = document.querySelectorAll(selector)[0];

    if (!target) {
        throw new Error('image-filters:: no "to" element found');
    }

    image = document.createElement('img');
    image.setAttribute('src', src);
    target.appendChild(image);
}

/**
 * @name contrastImage
 * @param {object} options
 * @param {string} options.url - image url
 * @param {string} options.imageData - data of a image extracted from a canvas
 * @param {string} options.from - dom selector of the original image
 * @param {string} options.to - dom selector of the target result
 */
function ImageFilter(options) {

    var canvas;
    var context;
    var element;

    if (!options || (!options.url && !options.imageData && !options.from)) {
        throw new Error('image-filters:: invalid options object');
    }

    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');

    this.url = options.url;
    this.imageData = options.imageData;
    this.from = options.from;
    this.to = options.to;

    if (this.url) {
        element = document.createElement('img');
        element.setAttribute('src', options.url);
        this.data = getImageData(context, element);
    } else if (options.imageData) {
        this.data = options.imageData;
    } else if (options.from) {
        element = getImageElement(options.from);
        this.data = getImageData(context, element);
    }

    if (!this.data) {
        throw new Error('image-filters:: no data found');
    }
}

ImageFilter.prototype.applyFilter = function(filter, options) {

    if (!filter) {
        throw new Error('image-filters:: no filter provided');
    }

    var filterFn = FILTER_CONFIG[filter.toUpperCase()];

    if (!filterFn) {
        throw new Error('image-filters:: invalud filter provided');
    }

    var options = options || {};
    options.data = this.data;

    var result = filterFn(options);

    appendResult(this.to, result);
};

module.exports = ImageFilter;
