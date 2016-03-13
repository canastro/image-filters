var imageFilterContrast = require('image-contrast');
var imageFilterBrightness = require('image-brightness');
var imageFilterGrayscale = require('image-filter-grayscale');
var imageFilterThreshold = require('image-filter-threshold');
var imageFilterSepia = require('image-filter-sepia');
var imageFilterColorize = require('image-filter-colorize');
var utils = require('./utils');

function getImageElement(selector) {
    var element = document.querySelectorAll(selector)[0];

    if (!element) {
        throw new Error('image-filters:: no "from" element found');
    }

    return element;
}

/**
 * @name contrastImage
 * @param {object} options
 * @param {string} options.url - image url
 * @param {string} options.imageData - data of a image extracted from a canvas
 * @param {string} options.from - dom selector of the original image
 */
function ImageFilter(options) {

    var canvas;
    var context;
    var element;

    if (!options || (!options.url && !options.imageData && !options.from)) {
        throw new Error('image-filters:: invalid options object');
    }

    this.url = options.url;
    this.from = options.from;

    if (this.url) {
        element = document.createElement('img');
        element.setAttribute('src', options.url);

        this.canvas = utils.getCanvas(element.width, element.height);
        this.context = this.canvas.getContext('2d');

        this.data = utils.getPixelsFromImage(this.canvas, this.context, element);
    } else if (options.imageData) {
        this.canvas = utils.getCanvas(options.imageData.width, options.imageData.height);
        this.context = this.canvas.getContext('2d');

        this.data = options.imageData;
    } else if (options.from) {
        element = getImageElement(options.from);
        this.canvas = utils.getCanvas(element.width, element.height);
        this.context = this.canvas.getContext('2d');

        this.data = utils.getPixelsFromImage(this.canvas, this.context, element);
    }

    if (!this.data) {
        throw new Error('image-filters:: no data found');
    }
}

ImageFilter.prototype.contrast = function (options) {
    options.data = this.data;

    this.data = imageFilterContrast(options);

    return this;
};

ImageFilter.prototype.grayscale = function (options) {
    this.data = imageFilterGrayscale({
        data: this.data
    });

    return this;
};

ImageFilter.prototype.brightness = function (options) {
    options.data = this.data;

    this.data = imageFilterBrightness(options);

    return this;
};

ImageFilter.prototype.sepia = function (options) {
    this.data = imageFilterSepia({
        data: this.data
    });

    return this;
};

ImageFilter.prototype.threshold = function (options) {
    options.data = this.data;

    this.data = imageFilterThreshold(options);

    return this;
};

ImageFilter.prototype.colorize = function (options) {
    options.data = this.data;

    this.data = imageFilterColorize(options);

    return this;
};

ImageFilter.prototype.append = function (selector) {

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
    image.setAttribute('src', utils.convertToDataURL(this.canvas, this.context, this.data));
    target.appendChild(image);
};

module.exports = ImageFilter;
