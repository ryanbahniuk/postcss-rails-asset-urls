var assert = require('assert');
var postcss = require('postcss');
var fs = require('fs');
var railsAssetUrls = require('../index.js');

describe('index.js', function() {
  describe('replaceWithFontUrl', function() {
    var matchGroup = '(fonts/font.eot)';

    it('should return font-url prefixed to the matchGroup', function() {
      var result = railsAssetUrls.replaceWithFontUrl('match', matchGroup);
      assert.equal(result, 'font-url' + matchGroup);
    });
  });

  describe('replaceWithImageUrl', function() {
    var matchGroup = '(images/test.png)';

    it('should return font-url prefixed to the matchGroup', function() {
      var result = railsAssetUrls.replaceWithImageUrl('match', matchGroup);
      assert.equal(result, 'image-url' + matchGroup);
    });
  });

  describe('replaceWithAssetUrl', function() {
    var matchGroup = '(images/test.png)';

    it('should return asset-url prefixed to the matchGroup', function() {
      var result = railsAssetUrls.replaceWithAssetUrl('match', matchGroup);
      assert.equal(result, 'asset-url' + matchGroup);
    });
  });

  describe('isImage', function() {
    var images = [
      'test.png',
      'test.jpg',
      'test.jpeg',
      'test.gif',
      'test.svg',
      'test.tif',
      'test.tiff'
    ];

    it('should return true if it includes a valid image path', function() {
      for(var i = 0; i < images.length; i++) {
        assert(railsAssetUrls.isImage(images[i]));
      }
    });

    it('should return false if it does not include a valid image path', function() {
      assert(!railsAssetUrls.isImage('font.eot'));
    });
  });

  describe('railsAssetUrls', function() {
    var input = fs.readFileSync('./test/input.css', 'utf-8');
    var expected3 = fs.readFileSync('./test/expected3.css', 'utf-8');
    var expected4 = fs.readFileSync('./test/expected4.css', 'utf-8');

    it('should replace url calls with asset-url if passed version 4.0.0', function() {
      var out = postcss(railsAssetUrls('4.0.0')).process(input);
      assert.equal(out.css, expected4);
    });

    it('should replace url calls with asset-url if passed higher than version 4.0.0', function() {
      var out = postcss(railsAssetUrls('5.0.0')).process(input);
      assert.equal(out.css, expected4);
    });

    it('should replace url calls with font-url or image-url if passed lower than version 4.0.0', function() {
      var out = postcss(railsAssetUrls('3.9.9')).process(input);
      assert.equal(out.css, expected3);
    });
  });
});
