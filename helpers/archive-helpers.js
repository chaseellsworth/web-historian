// The second will read the list of URLs from that file and fetch the pages specified by those URLs from the internet, saving each web page into a file on your computer.
// Configure this second app to run on a schedule using cron.

var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
  var list = fs.readFile(exports.paths.list, string, function(err, data){
    if (err) throw err;
    console.log(data);
  });
  //make it loopable
  return list;
};

exports.isUrlInList = function(requestedUrl){
  var list = exports.readListOfUrls();
  for (var i = 0; i < list.length; i++){
    if(list[i] === requestedUrl){
      return true;
    }
  }
  return false;
};

exports.addUrlToList = function(){
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(){
};
