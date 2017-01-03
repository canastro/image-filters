import imageFilterContrast from 'image-filter-contrast';
import imageFilterBrightness from 'image-brightness';
import imageFilterGrayscale from 'image-filter-grayscale';
import imageFilterThreshold from 'image-filter-threshold';
import imageFilterSepia from 'image-filter-sepia';
import imageFilterColorize from 'image-filter-colorize';
import { getCanvas } from 'image-filter-core';
import utils from './utils';

function getImageElement(selector) {
    const element = document.querySelectorAll(selector)[0];

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
    if (!options || (!options.url && !options.imageData && !options.from)) {
        throw new Error('image-filters:: invalid options object');
    }

    let element;

    this.filters = [];
    this.url = options.url;
    this.from = options.from;

    if (this.url) {
        element = document.createElement('img');
        element.setAttribute('src', options.url);

        this.canvas = getCanvas(element.width, element.height);
        this.context = this.canvas.getContext('2d');

        this.data = utils.getPixelsFromImage(this.canvas, this.context, element);
    } else if (options.imageData) {
        this.canvas = getCanvas(options.imageData.width, options.imageData.height);
        this.context = this.canvas.getContext('2d');

        this.data = options.imageData;
    } else if (options.from) {
        element = getImageElement(options.from);
        this.canvas = getCanvas(element.width, element.height);
        this.context = this.canvas.getContext('2d');

        this.data = utils.getPixelsFromImage(this.canvas, this.context, element);
    }

    if (!this.data) {
        throw new Error('image-filters:: no data found');
    }
}

ImageFilter.prototype.contrast = function (options) {
    this.filters.push({
        fn: imageFilterContrast,
        options
    });

    return this;
};

ImageFilter.prototype.grayscale = function () {
    this.filters.push({
        fn: imageFilterGrayscale,
        options: {}
    });

    return this;
};

ImageFilter.prototype.brightness = function (options) {
    this.filters.push({
        fn: imageFilterBrightness,
        options
    });

    return this;
};

ImageFilter.prototype.sepia = function () {
    this.filters.push({
        fn: imageFilterSepia,
        options: {}
    });

    return this;
};

ImageFilter.prototype.threshold = function (options) {
    this.filters.push({
        fn: imageFilterThreshold,
        options
    });

    return this;
};

ImageFilter.prototype.colorize = function (options) {
    this.filters.push({
        fn: imageFilterColorize,
        options
    });

    return this;
};

ImageFilter.prototype.append = function (selector) {
    if (!selector) {
        return;
    }

    const target = document.querySelectorAll(selector)[0];

    if (!target) {
        throw new Error('image-filters:: no "to" element found');
    }

    // Iterate filters and execute them one by one
    this.filters.reduce(
        (promise, filter) => promise.then(
            (data) => {
                const options = filter.options;
                options.data = data;

                return filter.fn(options);
            }
        ),
        Promise.resolve(this.data)
    ).then((data) => {
        const image = document.createElement('img');
        image.setAttribute('src', utils.convertToDataURL(this.canvas, this.context, data));
        target.appendChild(image);
    });
};

ImageFilter.prototype.update = function (selector) {
    const target = document.querySelectorAll(selector)[0];
    target.setAttribute('src', utils.convertToDataURL(this.canvas, this.context, this.data));
};

ImageFilter.prototype.getDataURL = function () {
    return utils.convertToDataURL(this.canvas, this.context, this.data);
};

module.exports = ImageFilter;
