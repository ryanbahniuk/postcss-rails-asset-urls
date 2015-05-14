var postcss = require('postcss');

module.exports = postcss.plugin('postcss-rails-asset-urls', function (opts) {
  opts = opts || {};

  var replacements = new RegExp('url', 'gi');
  
  return function (css) {
    css.nodes.forEach(function(node) {
      node.nodes.forEach(function(node) {
        node.value = node.value.replace(replacements, 'asset-url');
      });
    });
  };
});
