// The second will read the list of URLs from that file and fetch the pages specified by those URLs from the internet, saving each web page into a file on your computer.
// Configure this second app to run on a schedule using cron.

var fs = require('fs');
var path = require('path');
var _ = require('underscore');
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
  console.log("1");
  var list = exports.readListOfUrls();
  var urlList = list.split("\n");
  console.log(urlList);
  for (var i = 0; i < urlList.length; i++){
    if(urlList[i] === requestedUrl){
      return true;
    }
  }
  return false;
};

exports.addUrlToList = function(requestedUrl){
  var list = exports.readListOfUrls();
  console.log(list);
  var newList = list.concat("\n" + requestedUrl);
  console.log(newList);
  fs.writeFile(exports.paths.list, newList);
};

exports.isURLArchived = function(){
  console.log("hello");
};

exports.downloadUrls = function(requestedUrl){
  fs.writeFile(exports.paths.archivedSites + "/" + requestedUrl, "");
  var path = exports.paths.archivedSites + "/" + requestedUrl;
  // console.log(path);
  htmlfetcher.fetchUrl(requestedUrl, path);
};

exports.pathOfStoredUrl = function (requestedUrl){
  return exports.paths.archivedSites + "/" + requestedUrl;
}



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
