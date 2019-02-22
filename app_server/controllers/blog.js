/* Get Blog pages */
module.exports.blog = function(req, res){
  res.render('blog', {title: 'Raymond Leboo Blog Site'});

};

module.exports.blogList = function(req, res){
  res.render('blogList', {
	title: 'Blog List',
	blogs: [{
	  blog_title: 'First Blog Entry',
  	  blog_text: 'How to succeed as a computer science major'
       }, {
	  blog_title: 'Second Blog Entry',
	  blog_text: 'How to build a resume'
	}, {
          blog_title: 'Third Blog Entry',
          blog_text: 'How to get a job!'
	}]

});
};

module.exports.blogAdd = function(req, res){
  res.render('blogAdd', {title: 'Blog Add'});
};

module.exports.blogDelete = function(req, res){
  res.render('blogDelete', {title: 'Blog Delete'});
};

module.exports.blogEdit = function(req, res){
  res.render('blogEdit', {title: 'Blog Edit'});
};


