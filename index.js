var postcss = require('postcss');

module.exports = postcss.plugin('postcss-rails-asset-urls', function (opts) {
    opts = opts || {};

    // Work with options here

    return function (css) {

        // Transform CSS AST here

    };
});
