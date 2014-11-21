// The first will be a web service that serves pages over the web using a RESTful API
// It can accept URLs of sites that the user wants to archive.
// It uses POST requests to save submitted URLS to a single file on your computer.

var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var Q = require('q');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.sendResponse = function(response, obj, status){
  status = status || 200;
  response.writeHead(status, headers);
  response.end(obj);
};

exports.collectData = function(request, callback){
  var data = "";
  console.log("collectData");
  console.log(data);
  request.on("data", function(chunk){
    console.log("collectData");
    console.log(chunk);
    data += chunk;
    console.log("collectData");
    console.log(data);
  });
  request.on("end", function(){
    console.log("collectData");
    console.log(data);
    callback(data);
  })
};

exports.send404 = function(response){
  exports.sendResponse(response, "404 page not found", 404);
};

exports.sendRedirect = function(response, location, status){
  status = status || 302;
  response.writeHead(status, {Location: location});
  response.end();
};

exports.serveAssets = function(response, asset, callback) {
  var encoding = {encoding: "utf8"};
  fs.readFile(archive.paths.siteAssets + asset, encoding, function(err, data){
    if(err){
      fs.readFile(archive.paths.archiveSites + asset, encoding, function(err, data){
        if(err){
          callback ? callback() : exports.send404(response);
        }else{
          exports.sendResponse(response, data);
        }
      });
    }else{
      exports.sendResponse(response, data);
    }
  });
};




//   var headers =  export.headers;
//   header["Content-Type"] = type || "text/html";
//   response.writehead(statusCode, headers);
//   response.end(data);

// };

// exports.sendResponse = function(response, data, statusCode, type){
// }

// As you progress, keep thinking about what helper functions you can put here!
// Write some code here that helps serve up your static files!
// (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
