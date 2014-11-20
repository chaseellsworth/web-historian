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
  // console.log("Serving request tpe " + request.method + "for url " + request.url);
  // var parsedUrl = request.url.split("/");

  // if(request.url === '/'){
  //   response.writehead(statusCode, headers);
  //   // serveAssest(response, url path HTML, function(){} );
  //   // serveAssest(response, url path CSS, function(){} );
  //   // serveAssest(response, url path JS, function(){} );
  //   response.end();
  // }else if(request.method  === 'GET'){
  //   response.writehead(statusCode, headers);
  //   if( === false){
  //     // add it to the list
  //     // download it
  //   };
  //   // serveAssest(response, url path HTML, function(){} );
  //   // serveAssest(response, url path CSS, function(){} );
  //   // serveAssest(response, url path JS, function(){} );
  // response.end();
  // }else if(request.method  === 'POST'){
  //   statusCode = 201;
  //   response.writehead(statusCode, headers);
  // //   //IF IT IS ALREADY ARCHIVED
  // //     //RETURN THE HTML
  // //   //IF NOT, SAY IT'S NOT AND SHOW THE LOADING HTML PAGE
  // //   //HAVE THE HELPER FUNCTION DO A POST REQUEST TO ARCHIVE THE PAGE
  // //   //HAVE BACKGROUND SYSTEM ARCHIVE IT
  // }else {
  //   statusCode = 404;
  //   response.writehead(statusCode, headers);
  //   response.end(archive.paths.list);
};
archive.downloadUrls("www.rei.com");
// exports.handleRequest();
