# PostCSS Rails Asset URLs

PostCSS plugin to swap CSS URLs with the appropriate sass-rails helper. This is useful for CSS postprocessor compilation outside of the Rails pipeline when you still want to deploy assets through Rails. These helpers, when used in the Rails pipeline, will handle fingerprinting and asset paths for you as part of the normal Rails compilation.

## Installation

Install via npm:

 ```sh
npm install --save-dev postcss-rails-asset-urls
 ```

## Use

The post-css plugin function provided by this package takes an argument of the version of sass-rails that you are currently using. If this version is major version 4 or greater, it will replace all urls with `asset-url`. If it is under major version 4, it will replace font urls with `font-url` and image urls with `image-url`. If an argument is not given, it will default to replacing with `asset-url`.

## Example

```js
var postcss = require('postcss');
var railsAssetUrls = require('postcss-rails-asset-urls');

var css = '@font-face {font-family:Test;src:url("test.woff") format("woff"),url("test.otf") format("otf")}';
console.log(postcss(railsAssetUrls('4.0.0')).process(css).css);

// => '@font-face {font-family:Test;src:asset-url("test.woff") format("woff"),asset-url("test.otf") format("otf")}'
```

To use with [grunt-postcss](https://github.com/nDmitry/grunt-postcss "Grunt PostCSS"), add this to your Gruntfile:

```js
postcss: {
  options: {
    processors: [
      require('postcss-rails-asset-urls')('4.0.0')
    ]
  },
  dist: {
    src: 'dist/css/*.css'
  }
}
```

## Contributing

Pull requests are welcome. If you add functionality, then please add unit tests
to cover it.

## License

MIT © Ryan Bahniuk

[ci]:      https://travis-ci.org/ryanbahniuk/postcss-rails-asset-urls
[npm]:     https://www.npmjs.com/package/postcss-rails-asset-urls
[postcss]: https://github.com/postcss/postcss
