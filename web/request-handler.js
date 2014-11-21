var exports = module.exports = {};
var urlParser = require('url');
var queryString = require('querystring');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var statusCode = 200;
var headers = helpers.headers;
//var parsedUrl = request.url.split("/");
// var pathOfStoredUrl = archive.pathOfStoredUrl(request.url);
var actions = {

  'GET': function(request, response){
    var parts = urlParser.parse(request.url);
    var urlPath = parts.pathname === '/' ? '/index.html' : parts.pathname;
      helpers.serveAssets(response, urlPath, function(){
        if(archive.isUrlInList(urlPath.slice(1))){
          helpers.sendRedirect(response, '/loading.html')
        }else{
          helpers.send404(response);
        }
      })
    },

  //     if(archive.isUrlInList(pathOfStoredUrl)){
  //           if(err){ helpers.send404(response);}
  //           else{console.log(data)}
  //       })
  //     }else{
  //       helpers.sendRedirect(response, '/loading.html');

  //     }
  // },

  'POST': function(request, response){
    helpers.collectData(request, function(data){
      var url = data.split("=")[1];

      if (archive.isUrlInList(url)) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!');
        helpers.sendRedirect(response,'/' + url);
      }else{
        console.log('NNNNNNNNNNNNNNNNNOOOOOOOOOOOOOOOO');
        helpers.sendRedirect(response, '/loading.html');
        archive.addUrlToList(url);
        archive.downloadUrls(url);
        helpers.serveAssets(response,'/' + url);
      }
    });
  }

};

exports.handleRequest = function (request, response) {
  var pathOfStoredUrl = archive.pathOfStoredUrl(request.url);
  console.log("Serving request type " + request.method + " for url " + request.url);

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
    // var parts = urlParser.parse(request.url);
    // console.log(parts);
      // var pathOfStoredUrl = archive.pathOfStoredUrl(request.url);
    // var pathOfStoredUrl = archive.pathOfStoredUrl(request.url);
