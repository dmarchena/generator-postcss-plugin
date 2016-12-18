# <%= pluginName %> [![Build Status][travis-image]][travis-url] [![Coverage percentage][coveralls-image]][coveralls-url]

> <%= pluginDescription %>

This [PostCSS] plugin will transform this:

```
.foo {
  /* Input example */
}
```

To this:

```
.foo {
  /* Output example */
}
```

## Installation

```
npm i -D <%= pluginName %>
```

## Usage

```
postcss([ require('<%= pluginName %>') ])
```

[coveralls-image]: https://coveralls.io/repos/<%= author %>/<%= pluginName %>/badge.svg
[coveralls-url]: https://coveralls.io/r/<%= author %>/<%= pluginName %>
[travis-image]: https://travis-ci.org/<%= author %>/<%= pluginName %>.svg?branch=master
[travis-url]: https://travis-ci.org/<%= author %>/<%= pluginName %>
[PostCSS]: https://github.com/postcss/postcss
