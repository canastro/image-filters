var expect = require('chai').expect;
var sinon = require('sinon');
var utils = require('../src/utils');

describe('utils', function () {
    var sandbox;

    beforeEach(function() {
        // Create a sandbox for the test
        sandbox = sinon.sandbox.create();
    });

    afterEach(function() {
        // Restore all the things made through the sandbox
        sandbox.restore();
    });

    describe('#getPixelsFromImage()', function () {
        context('when tagName is not valid', function () {
            it('should throw a error', function () {
                var context = {
                    drawImage: sandbox.stub(),
                    getImageData: sandbox.stub()
                };

                var canvas = { width: 100, height: 150 };

                function fn() {
                    utils.getPixelsFromImage(canvas, context, { tagName: 'DUMMY' });
                }

                expect(fn).to.throw(/image-filters:: invalid origin/);
            });
        });

        context('when tagName is valid', function () {
            it('should convert draw Image and get imageData', function () {
                var expectedResult = 'TEST';
                var context = {
                    drawImage: sandbox.stub(),
                    getImageData: sandbox.stub().returns(expectedResult)
                };

                var element = { tagName: 'IMG' };
                var canvas = { width: 100, height: 150 };

                var result = utils.getPixelsFromImage(canvas, context, element);

                expect(result).to.equal(expectedResult);
                expect(context.drawImage.calledWith(element, 0, 0)).to.equal(true);
                expect(context.getImageData.calledWith(0, 0, canvas.width, canvas.height)).to.equal(true);
            });
        });
    });

    describe('#getElement()', function () {
        context('when no selector is provided', function () {
            it('should throw error', function () {
                function fn() {
                    utils.getElement();
                }

                expect(fn).to.throw(/image-filters:: no selector provided/);
            });
        });

        context('when no target is found', function () {
            it('should throw error', function () {
                sandbox.stub(document, 'querySelectorAll').returns([]);

                function fn() {
                    utils.getElement('#selector');
                }

                expect(fn).to.throw(/image-filters:: no "to" element found/);
            });
        });

        context('when querySelectorAll returns a element', function () {
            it('should throw error', function () {
                var selector = '.DUMMY-SELECTOR';
                var element = 'DUMMY-ELEMENT';

                sandbox.stub(document, 'querySelectorAll').returns([element]);

                var result = utils.getElement(selector);
                expect(document.querySelectorAll.calledWith(selector)).to.equal(true);
                expect(result).to.equal(element);
            });
        });
    });
});
