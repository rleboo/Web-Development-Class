var mongoose = require('mongoose');
//var Blog = mongoose.model('blog');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };

  module.exports.blogAdd = function (req, res) {
    sendJSONresponse(res, 200, {"status" : "success"});
  };                               
