var postcss = require('postcss');

var replacements = new RegExp('url\(([^)]+)\)', 'gi');

function replaceMatchGroup(match, matchGroup) {
  return "asset-url" + matchGroup;
}

var RailsAssetUrls = postcss.plugin('postcss-rails-asset-urls', function () {
  return function(css) {
    css.eachDecl(function(decl) {
      decl.value = decl.value.replace(replacements, replaceMatchGroup);
    });
  };
});

module.exports = RailsAssetUrls;
