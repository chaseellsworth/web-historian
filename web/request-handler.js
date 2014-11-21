var exports = module.exports = {};
var urlParser = require('url');
var queryString = require('querystring');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
// require more modules/folders here!

var statusCode = 200;
var headers = helpers.headers;
//var parsedUrl = request.url.split("/");
// var pathOfStoredUrl = archive.pathOfStoredUrl(request.url);
var actions = {

  'GET': function(request, response){
    var pathOfStoredUrl = archive.pathOfStoredUrl(request.url);
    var parts = urlParser.parse(request.url);
    var urlPath = parts.pathname === '/' ? '/index.html' : parts.pathname;
    helpers.serveAssets(response, urlPath, function(){
      if(archive.isUrlInList(pathOfStoredUrl)){
        helpers.sendRedirect(response, '/loading.html');
      }else{
        helpers.send404(response);
      }
    })
  },

  'POST': function(request, response){
    var pathOfStoredUrl = archive.pathOfStoredUrl(request.url);
    if (archive.isUrlInList(pathOfStoredUrl)) {
      //serve up the assets
    }else{
      helpers.sendRedirect(response, '/loading.html');
      console.log("1")
      archive.addUrlToList(pathOfStoredUrl);
      console.log("2")
      archive.downloadUrls(pathOfStoredUrl);
      console.log("3")
      helpers.sendRedirect(response, pathOfStoredUrl);
      console.log("4")
    }
  }
};




exports.handleRequest = function (request, response) {
  var pathOfStoredUrl = archive.pathOfStoredUrl(request.url);
  console.log("Serving request type " + request.method + "for url " + request.url);

  var action = actions[request.method];
  if(action){
    action(request, response);
  } else {
    helper.sendResponse(response, "Not found", 404);
  }

};
//console.log(archive.siteAssets + "/index.html");
// archive.downloadUrls("www.bestbuy.com ");
// exports.handleRequest('GET');
    // helpers.serverAsset(CSS)
  //GET - when they load the site, give them html
  //     serveAsset(response, urlpath, callback)
    // serveAssest(response, url path HTML, function(){} );
  //   response.end();
  // }else if(request.method  === 'POST'){
  //   response.writehead(statusCode, headers);
  //   if(isUrlInList){
  //     serveAsset(response, urlpath, callback)
  //   else{
  //   serveAsset(response, urlpathtoDownloadingHTML, callback)
  //    addToList();
  //    donwloadUrl();
  //    serveAsset(response, urlpathtoRequestedHTML, callback)
  //    };
  //    response.end();
  // }else {
  //   statusCode = 404;
  //   response.writehead(statusCode, headers);
  //   response.end(archive.paths.list);
