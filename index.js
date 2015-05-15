var postcss = require('postcss');

var RailsAssetUrls = postcss.plugin('postcss-rails-asset-urls', function (opts) {
  opts = opts || {};

  var replacements = new RegExp('url', 'gi');

  return function(css) {
    css.eachDecl(function(decl) {
      decl.value = decl.value.replace(replacements, 'asset-url');
    });
  };
});

module.exports = RailsAssetUrls;
