// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var httpRequest = require('http-request');

exports.fetchUrl = function(requestedUrl, pathToSaveFile){
  ///http
  httpRequest.get(
    //////OPTIONS OBJECT////
    {
      url: requestedUrl,
      progress: function (current, total) {
        console.log('downloaded %d bytes from %d', current, total);
      }
    },
    //////PATH//////////////
    pathToSaveFile,
    //////CALLBACK//////////
    function (err, res ) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(res.code, res.headers, res.file);
    }
  );
}
