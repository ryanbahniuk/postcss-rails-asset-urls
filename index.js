var postcss = require('postcss');

module.exports = postcss.plugin('postcss-rails-asset-urls', function (opts) {
  opts = opts || {};

  var replacements = new RegExp('url', 'gi');

  return function (css) {
    css.eachRule(function(rule) {
      if (rule.type === 'font-face') {
        for(var i = 0; i < rule.declarations.length; i++) {
          if (rule.declarations[i].property === 'src') {
            console.log(rule.declarations[i]);
            rule.declarations[i].value = rule.declarations[i].value.replace(replacements, 'asset-url');
          }
        }
      }
    });
  };
});
