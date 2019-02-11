/* Get Blog pages */
module.exports.blog = function(req, res){
  res.render('blogAdd', {title: 'Raymond Leboo Blog Site'});

};

module.exports.blogList = function(req, res){
  res.render('blogList', {title: 'Blog List'});
};

module.exports.blogAdd = function(req, res){
  res.render('blogAdd', {title: 'Blog Add'});
};

