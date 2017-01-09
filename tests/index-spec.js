var expect = require('chai').expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var utils = require('../src/utils');

describe('index', function () {
    var sandbox;

    beforeEach(function() {
        // Create a sandbox for the test
        sandbox = sinon.sandbox.create();
    });

    afterEach(function() {
        // Restore all the things made through the sandbox
        sandbox.restore();
    });

    context('when no modules are mocked', function() {
        var ImageFilter = require('../src/index');
        var imageFilterCore = require('image-filter-core');
        var imageFilterContrast = require('image-filter-contrast');
        var imageFilterBrightness = require('image-filter-brightness');
        var imageFilterGrayscale = require('image-filter-grayscale');
        var imageFilterThreshold = require('image-filter-threshold');
        var imageFilterSepia = require('image-filter-sepia');
        var imageFilterColorize = require('image-filter-colorize');

        describe('#constructor', function () {
            context('when no options are provided', function () {
                it('should throw error', function () {
                    function fn() {
                        new ImageFilter();
                    }

                    expect(fn).to.throw(/image-filters:: invalid options object/);
                });
            });

            context('when no url/imageData/from is provided', function () {
                it('should throw error', function () {
                    function fn() {
                        new ImageFilter({});
                    }

                    expect(fn).to.throw(/image-filters:: invalid options object/);
                });
            });

            context('when url is provided', function () {
                it('should throw error', function () {
                    var data = 'DUMMY-DATA';
                    var options = { url: 'DUMMY-URL' };
                    var canvas = {
                        getContext: sandbox.stub()
                    };
                    var element = {
                        setAttribute: sandbox.stub(),
                        width: 100,
                        height: 150
                    };

                    sandbox.stub(document, 'createElement').returns(element);
                    sandbox.stub(imageFilterCore, 'getCanvas').returns(canvas);
                    sandbox.stub(utils, 'getPixelsFromImage').returns(data);

                    var imageFilter = new ImageFilter(options);

                    expect(document.createElement.calledWith('img')).to.equal(true);
                    expect(element.setAttribute.calledWith('src', options.url)).to.equal(true);
                    expect(imageFilterCore.getCanvas.calledWith(element.width, element.height)).to.equal(true);
                    expect(canvas.getContext.calledWith('2d')).to.equal(true);
                    expect(utils.getPixelsFromImage.calledOnce).to.equal(true);
                    expect(imageFilter.data).to.equal(data);
                });
            });

            context('when from is provided', function () {
                it('should throw error', function () {
                    var data = 'DUMMY-DATA';
                    var options = { from: 'DUMMY-FROM' };
                    var canvas = {
                        getContext: sandbox.stub()
                    };
                    var element = {
                        width: 100,
                        height: 150
                    };

                    sandbox.stub(utils, 'getElement').returns(element);
                    sandbox.stub(utils, 'getPixelsFromImage').returns(data);
                    sandbox.stub(imageFilterCore, 'getCanvas').returns(canvas);

                    var imageFilter = new ImageFilter(options);

                    expect(utils.getElement.calledWith(options.from)).to.equal(true);
                    expect(imageFilterCore.getCanvas.calledWith(element.width, element.height));
                    expect(canvas.getContext.calledWith('2d')).to.equal(true);
                    expect(utils.getPixelsFromImage.calledOnce).to.equal(true);
                    expect(imageFilter.data).to.equal(data);
                });
            });

            context('when imageData is provided', function () {
                it('should throw error', function () {
                    var options = { imageData: 'DUMMY-DATA' };
                    var imageFilter = new ImageFilter(options);

                    expect(imageFilter.data).to.equal(options.imageData);
                });
            });

            context('when this.data is undefined', function () {
                it('should throw error', function () {
                    function fn() {
                        var data = null;
                        var options = { from: 'DUMMY-FROM' };
                        var canvas = {
                            getContext: sandbox.stub()
                        };
                        var element = {
                            width: 100,
                            height: 150
                        };

                        sandbox.stub(utils, 'getElement').returns(element);
                        sandbox.stub(utils, 'getPixelsFromImage').returns(data);
                        sandbox.stub(imageFilterCore, 'getCanvas').returns(canvas);

                        var imageFilter = new ImageFilter(options);

                        expect(utils.getElement.calledWith(options.from)).to.equal(true);
                        expect(imageFilterCore.getCanvas.calledWith(element.width, element.height));
                        expect(canvas.getContext.calledWith('2d')).to.equal(true);
                        expect(utils.getPixelsFromImage.calledOnce).to.equal(true);
                        expect(imageFilter.data).to.equal(data);
                    }

                    expect(fn).to.throw(/image-filters:: no data found/);
                });
            });
        });

        describe('#contrast()', function () {
            it('should add filter', function () {
                var options = { imageData: 'DUMMY-DATA' };
                var filterOptions = { contrast: 50 };
                var imageFilter = new ImageFilter(options)
                    .contrast(filterOptions);

                expect(imageFilter.filters).to.deep.equal([{
                    fn: imageFilterContrast,
                    options: filterOptions
                }]);
            });
        });

        describe('#grayscale()', function () {
            it('should add filter', function () {
                var options = { imageData: 'DUMMY-DATA' };
                var imageFilter = new ImageFilter(options)
                    .grayscale();

                expect(imageFilter.filters).to.deep.equal([{
                    fn: imageFilterGrayscale
                }]);
            });
        });

        describe('#brightness()', function () {
            it('should add filter', function () {
                var options = { imageData: 'DUMMY-DATA' };
                var filterOptions = { adjustment: 50 };
                var imageFilter = new ImageFilter(options)
                    .brightness(filterOptions);

                expect(imageFilter.filters).to.deep.equal([{
                    fn: imageFilterBrightness,
                    options: filterOptions
                }]);
            });
        });

        describe('#sepia()', function () {
            it('should add filter', function () {
                var options = { imageData: 'DUMMY-DATA' };
                var imageFilter = new ImageFilter(options)
                    .sepia();

                expect(imageFilter.filters).to.deep.equal([{
                    fn: imageFilterSepia
                }]);
            });
        });

        describe('#threshold()', function () {
            it('should add filter', function () {
                var options = { imageData: 'DUMMY-DATA' };
                var filterOptions = { threshold: 50 };
                var imageFilter = new ImageFilter(options)
                    .threshold(filterOptions);

                expect(imageFilter.filters).to.deep.equal([{
                    fn: imageFilterThreshold,
                    options: filterOptions
                }]);
            });
        });

        describe('#colorize()', function () {
            it('should add filter', function () {
                var options = { imageData: 'DUMMY-DATA' };
                var filterOptions = { color: '#000000', level: 50 };
                var imageFilter = new ImageFilter(options)
                    .colorize(filterOptions);

                expect(imageFilter.filters).to.deep.equal([{
                    fn: imageFilterColorize,
                    options: filterOptions
                }]);
            });
        });

        describe('#append()', function () {
            it('should append image', function (done) {
                var target = { appendChild: sandbox.stub() };
                var image = { setAttribute: sandbox.stub() };
                var options = { imageData: 'DUMMY-DATA' };
                var nWorkers = 4;
                var data = 'DUMMY-DATA';
                var imageFilter = new ImageFilter(options, nWorkers);

                sandbox.stub(document, 'querySelectorAll').returns([target]);
                sandbox.stub(document, 'createElement').returns(image);
                sandbox.stub(imageFilterCore, 'convertImageDataToCanvasURL');
                sandbox.stub(imageFilter, 'apply').returns(Promise.resolve(data));

                imageFilter.append('#selector').then(function () {
                    expect(imageFilter.apply.calledOnce).to.equal(true);
                    expect(document.createElement.calledWith('img')).to.equal(true);
                    expect(image.setAttribute.calledOnce).to.equal(true);
                    expect(target.appendChild.calledOnce).to.equal(true);
                    done();
                });
            });
        });

        describe('#update()', function () {
            it('should call apply', function (done) {
                var target = { setAttribute: sandbox.stub() };
                var options = { imageData: 'DUMMY-DATA' };
                var nWorkers = 4;
                var data = 'DUMMY-DATA';
                var imageFilter = new ImageFilter(options, nWorkers);

                sandbox.stub(utils, 'getElement').returns(target);
                sandbox.stub(imageFilterCore, 'convertImageDataToCanvasURL');
                sandbox.stub(imageFilter, 'apply').returns(Promise.resolve(data));

                imageFilter.update('#selector').then(function () {
                    expect(imageFilter.apply.calledOnce).to.equal(true);
                    expect(target.setAttribute.calledOnce).to.equal(true);
                    expect(imageFilterCore.convertImageDataToCanvasURL.calledWith(data)).to.equal(true);
                    done();
                });
            });
        });

        describe('#getDataURL()', function () {
            it('should call convertImageDataToCanvasURL', function () {
                var options = { imageData: 'DUMMY-DATA' };
                var imageFilter = new ImageFilter(options, 4);
                imageFilter.data = 'DUMMY-DATA';

                sandbox.stub(imageFilterCore, 'convertImageDataToCanvasURL').returns('DUMMY-URL');

                var result = imageFilter.getDataURL();

                expect(result).to.equal('DUMMY-URL');
                expect(imageFilterCore.convertImageDataToCanvasURL.calledWith(imageFilter.data)).to.equal(true);
            });
        });
    });

    describe('#apply()', function () {
        it('should call filters', function (done) {
            var imageFilterColorize = sandbox.stub().returns(Promise.resolve('DUMMY-DATA-1'));
            var imageFilterSepia = sandbox.stub().returns(Promise.resolve('DUMMY-DATA-2'));
            var ImageFilter = proxyquire('../src/index', {
                'image-filter-colorize': imageFilterColorize,
                'image-filter-sepia': imageFilterSepia
            });

            var options = { imageData: 'DUMMY-DATA' };
            var filterOptions = { color: '#000000', level: 50 };
            var nWorkers = 4;
            var imageFilter = new ImageFilter(options, nWorkers)
                .colorize(filterOptions)
                .sepia();

            imageFilter.apply().then(function (data) {
                expect(imageFilterColorize.calledWith('DUMMY-DATA', filterOptions, nWorkers)).to.equal(true);
                expect(imageFilterSepia.calledWith('DUMMY-DATA-1', nWorkers)).to.equal(true);
                expect(data).to.equal('DUMMY-DATA-2');
                done();
            });
        });
    });
});
