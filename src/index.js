const imageFilterContrast = require('image-filter-contrast');
const imageFilterBrightness = require('image-filter-brightness');
const imageFilterGrayscale = require('image-filter-grayscale');
const imageFilterThreshold = require('image-filter-threshold');
const imageFilterSepia = require('image-filter-sepia');
const imageFilterInvert = require('image-filter-invert');
const imageFilterColorize = require('image-filter-colorize');
const imageFilterCore = require('image-filter-core');
const utils = require('./utils');

/**
 * @method imageFilter
 * @param {Object} options
 * @param {String} [options.url] - image url
 * @param {String} [options.imageData] - data of a image extracted from a canvas
 * @param {String} [options.from] - dom selector of the original image
 * @param {Number} nWorkers - number of workers to split the work
 */
function ImageFilter(options, nWorkers) {
    var element;
    var canvas;
    var context;

    if (!options || (!options.url && !options.imageData && !options.from)) {
        throw new Error('image-filters:: invalid options object');
    }

    this.filters = [];
    this.nWorkers = nWorkers;
    this.url = options.url;
    this.from = options.from;

    if (this.url) {
        element = document.createElement('img');
        element.setAttribute('src', options.url);

        canvas = imageFilterCore.getCanvas(element.width, element.height);
        context = canvas.getContext('2d');

        this.data = utils.getPixelsFromImage(canvas, context, element);
    }  else if (options.from) {
        element = utils.getElement(options.from);
        canvas = imageFilterCore.getCanvas(element.width, element.height);
        context = canvas.getContext('2d');

        this.data = utils.getPixelsFromImage(canvas, context, element);
    } else {
        this.data = options.imageData;
    }

    if (!this.data) {
        throw new Error('image-filters:: no data found');
    }
}

/**
 * Push contrast filter
 * @method  contrast
 * @param   {Object} options
 * @returns {ImageFilter}
 */
ImageFilter.prototype.contrast = function (options) {
    this.filters.push({
        fn: imageFilterContrast,
        options: options
    });

    return this;
};

/**
 * Push grayscale filter
 * @method  grayscale
 * @param   {Object} options
 * @returns {ImageFilter}
 */
ImageFilter.prototype.grayscale = function () {
    this.filters.push({ fn: imageFilterGrayscale });
    return this;
};

/**
 * Push brightness filter
 * @method  brightness
 * @param   {Object} options
 * @returns {ImageFilter}
 */
ImageFilter.prototype.brightness = function (options) {
    this.filters.push({
        fn: imageFilterBrightness,
        options: options
    });

    return this;
};

/**
 * Push sepia filter
 * @method  sepia
 * @param   {Object} options
 * @returns {ImageFilter}
 */
ImageFilter.prototype.sepia = function () {
    this.filters.push({ fn: imageFilterSepia });

    return this;
};

/**
 * Push threshold filter
 * @method  threshold
 * @param   {Object} options
 * @returns {ImageFilter}
 */
ImageFilter.prototype.threshold = function (options) {
    this.filters.push({
        fn: imageFilterThreshold,
        options: options
    });

    return this;
};

/**
 * Push invert filter
 * @method  invert
 * @param   {Object} options
 * @returns {ImageFilter}
 */
ImageFilter.prototype.invert = function () {
    this.filters.push({
        fn: imageFilterInvert
    });

    return this;
};

/**
 * Push colorize filter
 * @method  colorize
 * @param   {Object} options
 * @returns {ImageFilter}
 */
ImageFilter.prototype.colorize = function (options) {
    this.filters.push({
        fn: imageFilterColorize,
        options: options
    });

    return this;
};

/**
 * Iterates all filters and applies filters
 * @method  apply
 * @returns {Promise}
 */
ImageFilter.prototype.apply = function () {
    var nWorkers = this.nWorkers;
    return this.filters.reduce(function (promise, filter) {
        return promise.then(function (data) {
            var params = [data];

            if (filter.options) {
                params.push(filter.options);
            }

            params.push(nWorkers);

            return filter.fn.apply(null, params);
        }.bind(this));
    }, Promise.resolve(this.data)).then(function (data) {
        this.data = data;
        return data;
    });
};

/**
 * Applies the filters and appends it to the given selector node
 * @method  append
 * @param   {String} selector
 * @returns {Promise}
 */
ImageFilter.prototype.append = function (selector) {
    const target = utils.getElement(selector);

    return this.apply().then(function(data) {
        const image = document.createElement('img');
        image.setAttribute('src', imageFilterCore.convertImageDataToCanvasURL(data));
        target.appendChild(image);
    });
};

/**
 * Re-apply filters and updates targer
 * @method  update
 * @param   {String} selector
 * @returns {Promise}
 */
ImageFilter.prototype.update = function (selector) {
    const target = utils.getElement(selector);

    return this.apply().then(function (data) {
        target.setAttribute('src', imageFilterCore.convertImageDataToCanvasURL(data));
    });
};

/**
 * Returns the dataURL from the current data
 * @method  getDataURL
 * @returns {String}
 */
ImageFilter.prototype.getDataURL = function () {
    console.log(this.data);
    return imageFilterCore.convertImageDataToCanvasURL(this.data);
};

module.exports = ImageFilter;
