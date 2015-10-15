# PostCSS Rails Asset URLs Changelog

## 1.0.1 Initial Release

## 2.0.0

* Pass the sass-rails version as an option to the plugin. This will determine whether the urls are replaced with `asset-url` or `font-url` and `image-url` depending on the type of the asset. This will default to `asset-url` for backward compatability.

## 3.0.0

* Bump dependencies to use PostCSS ^5.0.10 and its new Container#walkDecls function. The previously used function Container#eachDecl was deprecated.