var postcss = require('postcss');

var replacements = new RegExp('url\(([^)]+)\)', 'gi');

function replaceWithFontUrl(match, matchGroup) {
  return "font-url" + matchGroup;
}

function replaceWithImageUrl(match, matchGroup) {
  return "image-url" + matchGroup;
}

function isImage(string) {
  return !!string.match(/(\.png|\.jpg|\.jpeg|\.gif|\.svg|\.tif|\.tiff)/);
}

var RailsAssetUrls = postcss.plugin('postcss-rails-asset-urls', function () {
  return function(css) {
    css.eachDecl(function(decl) {
      if (decl.parent.name === 'font-face') {
        decl.value = decl.value.replace(replacements, replaceWithFontUrl);
      } else if (isImage(decl.value)) {
        decl.value = decl.value.replace(replacements, replaceWithImageUrl);
      }
    });
  };
});

if (process.env.NODE_ENV === 'test') {
  RailsAssetUrls.replaceWithFontUrl = replaceWithFontUrl;
  RailsAssetUrls.replaceWithImageUrl = replaceWithImageUrl;
  RailsAssetUrls.isImage = isImage;
}

module.exports = RailsAssetUrls;
