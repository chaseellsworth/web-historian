// The first will be a web service that serves pages over the web using a RESTful API
// It can accept URLs of sites that the user wants to archive.
// It uses POST requests to save submitted URLS to a single file on your computer.

var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var statusCode = 200;


exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(response, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
};

// As you progress, keep thinking about what helper functions you can put here!
