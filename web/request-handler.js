var exports = module.exports = {};
var url = require('url');
var queryString = require('querystring');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
// require more modules/folders here!

var statusCode = 200;
var headers = helpers.headers;

exports.handleRequest = function (request, response) {
  console.log("Serving request type " + request.method + "for url " + request.url);
  var parsedUrl = request.url.split("/");
  var pathOfStoredUrl = archive.pathOfStoredUrl(request.url);

  if(request.url === '/'){
    helpers.serverAsset(HTML)
    // helpers.serverAsset(CSS)

    // serveAssest(response, url path HTML, function(){} );
  //   response.end();
  // }else if(request.method  === 'GET'){
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
};
archive.downloadUrls("www.bestbuy.com ");
// exports.handleRequest('GET');
