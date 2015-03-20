/**
 * jsxify — a Browserify transform for JSX
 */
"use strict";

var jsxtransform = require('jsx-transform');
var through    = require('through');

function jsxify(filename, options) {
  options = options || {};

  var source = '';

  function write(chunk) {
    return source += chunk;
  }

  function compile() {
    if (isJSXFile(filename, options)) {
      try {
        var output = jsxtransform.transform(source);
        this.queue(output);
      } catch (error) {
        error.name = 'jsxify Error';
        error.message = filename + ': ' + error.message;
        error.fileName = filename;
        this.emit('error', error);
      }
    } else {
      this.queue(source);
    }
    return this.queue(null);
  }

  return through(write, compile);
}

function isJSXFile(filename, options) {
  if (options.everything) {
    return true;
  } else {
    var extensions = ['js', 'jsx']
      .concat(options.extension)
      .concat(options.x)
      .filter(Boolean)
      .map(function(ext) { return ext[0] === '.' ? ext.slice(1) : ext });
    return new RegExp('\\.(' + extensions.join('|') + ')$').exec(filename);
  }
}

module.exports = jsxify;
