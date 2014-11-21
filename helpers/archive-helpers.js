// The second will read the list of URLs from that file and fetch the pages specified by those URLs from the internet, saving each web page into a file on your computer.
// Configure this second app to run on a schedule using cron.

var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
var htmlfetcher = require('../workers/htmlfetcher.js')


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(){
 return fs.readFileSync(exports.paths.list, "utf8");
};


exports.isUrlInList = function(requestedUrl){
  var list = exports.readListOfUrls();
  var urlList = list.split("\n");
  for (var i = 0; i < urlList.length; i++){
    if(urlList[i] === requestedUrl){
      return true;
    }
  }
  return false;
};

exports.addUrlToList = function(url, callback){
  fs.appendFile(exports.path.list, url+'\n', function(err, file){
    callback();
  });
  // var list = exports.readListOfUrls();
  // var newList = list.concat("\n" + requestedUrl);
  // fs.writeFile(exports.paths.list, newList);
};

exports.isURLArchived = function(url, callback){
  var sitePath = path.join(exports.path.archivedSites, url);

  fs.exists(sitePath, function(exists){
    callback(exists);
  });
};

exports.downloadUrls = function(requestedUrl, callback){
  fs.writeFile(exports.paths.archivedSites + "/" + requestedUrl, ""); //creates an empty file with the name of the requested url
  var path = exports.paths.archivedSites + "/" + requestedUrl; //creates a path to the empty file
  htmlfetcher.fetchUrl(requestedUrl, path); //grabs html data from the website and puts it on the file
  callback();
};

// exports.pathOfStoredUrl = function (requestedUrl){
//   return exports.paths.archivedSites + "/" + requestedUrl;
// }

////IN CASE WE GET CONFUSED ABOUT CALLBACKS
// exports.readListOfUrls = function(func){
//   var list = fs.readFile(exports.paths.list, string, function(err, data){
//     if (err){
//       throw err;
//     } else {
//       console.log(data);}
//     };
//   );
//   return list
// };
