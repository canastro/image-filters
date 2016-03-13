var expect = require('chai').expect;
var sinon = require('sinon');
var utils = require('../src/utils');

describe('utils', function () {
    it('should return a canvas of 100 x 100', function () {
        var expectedResult = '<canvas width="100" height="100"></canvas>';
        var element = utils.getCanvas(100, 100);

        expect(element.tagName).to.equal('CANVAS');
        expect(element.height).to.equal(100);
        expect(element.width).to.equal(100);
    });

    it('should convert imageData to a dataURL', function () {
        var context = {
            putImageData: sinon.spy()
        };
        var canvas = {
            toDataURL: sinon.stub().returns('dataurl')
        };

        var result = utils.convertToDataURL(canvas, context, 'imageData');

        expect(result).to.equal('dataurl');
        expect(context.putImageData.calledWith('imageData', 0, 0)).to.equal(true);
    });
});
