# PostCSS Rails Asset URLs

PostCSS plugin to swap CSS URLs with the Rails SASS helper, `asset-url`. This is useful for CSS postprocessor compilation outside of the Rails pipeline when you still want to deploy assets through Rails. `asset-url` in the Rails pipeline will handle fingerprinting and asset paths for you as part of the normal Rails compilation.

## Installation

Install via npm:

 ```sh
npm install --save-dev postcss-rails-asset-urls
 ```

## Example

```js
var postcss = require('postcss');
var railsAssetUrls = require('postcss-rails-asset-urls');

var css = '@font-face {font-family:Test;src:url("test.woff") format("woff"),url("test.otf") format("otf")}';
console.log(postcss(railsAssetUrls()).process(css).css);

// => '@font-face {font-family:Test;src:asset-url("test.woff") format("woff"),asset-url("test.otf") format("otf")}'
```

To use with [grunt-postcss](https://github.com/nDmitry/grunt-postcss "Grunt PostCSS"), add this to your Gruntfile:

```js
postcss: {
  options: {
    processors: [
      require('postcss-rails-asset-urls')()
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
[npm]:     http://badge.fury.io/js/postcss-discard-font-face
[postcss]: https://github.com/postcss/postcss
