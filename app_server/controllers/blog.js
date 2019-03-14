var request = require('request');
var apiOptions = {
  server : "http://localhost"
}; 

/* Get Blog pages */
module.exports.blog = function(req, res){
  res.render('blog', {title: 'Raymond Leboo Blog Site'});

};

/* GET blog lists */      
module.exports.blogList = function(req, res){
  var requestOptions, path;
  path = '/api/blogs';
  requestOptions = { 
      url : apiOptions.server + path,
      method : "GET",
      json : {},
      qs : {} 
      };
  request(
      requestOptions,
      function(err, response, body) {
          renderListPage(req, res, body);
      }
  );
};
/* Render the book list page */
var renderListPage = function(req, res, responseBody){
  res.render('blogList', {
      title: 'Blog List',
      pageHeader: {
          blog_title: 'blog_title'
      },
      blogs: responseBody
  });
};            

/* Book Show */
module.exports.blogEdit = function(req, res) {
  var requestOptions, path;
  path = "/api/blogs/" + req.params.id;
  requestOptions = {
      url : apiOptions.server + path,
      method : "GET",
      json : {}
  }; 
  request(
      requestOptions,
      function(err, response, body) {
              renderShowPage(req, res, body);
}
  );
};
/* Render the book show page */
var renderShowPage = function(req, res, responseBody){
  res.render('blogEdit', {
      title: 'Blog Edit',
      pageHeader: {
              blog_title: 'Blog Info'
      },
      blogs: responseBody
  });
};      

module.exports.blogAdd = function(req, res){
  res.render('blogAdd', {title: 'Blog Add'});
};


/* Blog Delete */
module.exports.blogDelete = function(req, res) {
  var requestOptions, path;
  path = "/api/blogs/" + req.params.id;
  requestOptions = {
      url : apiOptions.server + path,
      method : "GET",
      json : {}
  };
  request(
requestOptions,
      function(err, response, body) {
          renderDeletePage(req, res, body);
      }
  );
};
/* Render the Blog delete page */
var renderDeletePage = function(req, res, responseBody){
      res.render('blogDelete', {
      title: "Blog Delete",
      test: responseBody.blog_title ,
      pageHeader: {
          blog_ti: 'Blog Delete'
      },
      blog: responseBody
  });
};
