/**
 * @method getPixelsFromImage
 * @param {Object} canvas
 * @param {Object} context
 * @param {Object} imageData
 */
function getPixelsFromImage(canvas, context, element) {
    if (element.tagName !== 'IMG') {
        throw new Error('image-filters:: invalid origin');
    }

    context.drawImage(element, 0, 0);
    return context.getImageData(0, 0, canvas.width, canvas.height);
}

/**
 * Get a dom nome by selector
 * @method  getElement
 * @param   {String}   selector
 * @returns {Node}
 */
function getElement(selector) {
    if (!selector) {
        throw new Error('image-filters:: no selector provided');
    }

    const target = document.querySelectorAll(selector)[0];

    if (!target) {
        throw new Error('image-filters:: no "to" element found');
    }

    return target;
}

module.exports = {
    getElement: getElement,
    getPixelsFromImage: getPixelsFromImage
};
