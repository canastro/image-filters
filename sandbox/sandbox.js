var ImageFilter = require('../src/index');
const effects = {};

function clearContainer(selector) {
    var myNode = document.getElementById(selector);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function getOptions(key) {
    switch (key) {
        case 'brightness':
            return {
                adjustment: parseInt(document.getElementById('input-brightness-value').value, 10)
            };
        case 'contrast':
            return {
                contrast: parseInt(document.getElementById('input-contrast-value').value, 10)
            };
        case 'threshold':
            return {
                threshold: parseInt(document.getElementById('input-threshold-value').value, 10)
            };
        case 'colorize':
            return {
                color: document.getElementById('input-colorize-color-value').value,
                level: parseInt(document.getElementById('input-colorize-level-value').value, 10)
            };
        //sepia
        //threshold
        //grayscale
        default:
            return;
    }
}

function removeEffect(key) {
    effects[key].isActive = false;
}

window.toggleEffect = function(key) {
    var element = document.getElementById('btn-' + key);
    element.classList.toggle('is-active');

    if (effects[key] && effects[key].isActive) {
        return removeEffect(key, element);
    }

    effects[key] = {
        isActive: true,
        value: null
    };
}

window.apply = function () {

    clearContainer('results-container');

    var imageFilter = new ImageFilter({
        url: 'dummy.jpg'
    });

    Object.keys(effects).forEach(function(key) {
        if (!effects[key].isActive) {
            return;
        }

        imageFilter = imageFilter[key](getOptions(key));
    });

    imageFilter.append('#results-container');
}
