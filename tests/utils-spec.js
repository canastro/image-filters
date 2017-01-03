var expect = require('chai').expect;
var sinon = require('sinon');
var utils = require('../src/utils');

describe('utils', function () {
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
