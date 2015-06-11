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
    it('should replace url calls with asset-url', function() {
      var input = fs.readFileSync('./test/input.css', 'utf-8');
      var expected = fs.readFileSync('./test/expected.css', 'utf-8');

      var out = postcss(railsAssetUrls()).process(input);

      assert.equal(out.css, expected, 'Output did not match the input.');
    });
  });
});
