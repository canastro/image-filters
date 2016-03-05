var ImageFilter = require('../index');
var elementOne;
var elementTwo;
var elementThree;

function applyFilter(filter, options) {

    clearResults();
    resetElements().then(function () {
        elementOne.applyFilter(filter, options);
        elementTwo.applyFilter(filter, options);
        elementThree.applyFilter(filter, options);
    });
}

function clearResults() {
    var targetNodes = document.querySelectorAll(".target");
    [].forEach.call(targetNodes,function(targetNode) {
        while (targetNode.firstChild) {
            targetNode.removeChild(targetNode.firstChild);
        }
    });
}

function resetElements() {

    return new Promise(function(resolve) {
        //Usage 1:
        elementOne = new ImageFilter({
            from: '#original',
            to: '#target-1'
        });

        //Usage 2:
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var img = new Image;
        img.onload = function(){
            context.drawImage(img,0,0);

            var imageData = context.getImageData(0, 0, img.width, img.height);

            elementTwo = new ImageFilter({
                imageData: imageData,
                to: '#target-2'
            });

            resolve();
        };
        img.src = "http://lorempixel.com/400/200";

        //Usage 3:
        elementThree = new ImageFilter({
            url: "http://lorempixel.com/400/200",
            to: '#target-3'
        });
    });
}

window.onload = function () {

    var input = document.getElementById("filter-value");

    document.getElementById("btn-brightness").addEventListener("click", function () {
        applyFilter('brightness', {
            adjustment: input.value || 0
        });
    });

    document.getElementById("btn-contrast").addEventListener("click", function () {
        applyFilter('contrast', {
            adjustment: input.value || 0
        });
    });

    document.getElementById("btn-threshold").addEventListener("click", function () {
        applyFilter('threshold', {
            threshold: input.value || 0
        });
    });

    document.getElementById("btn-grayscale").addEventListener("click", function () {
        applyFilter('grayscale');
    });
}
