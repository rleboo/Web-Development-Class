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

/* Blog Edit */
module.exports.blogEdit = function(req, res) {
  var requestOptions, path;
  path = "/api/blogs/" + req.params.blogid;
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
/* Render the blog edit page */
var renderShowPage = function(req, res, responseBody){
  res.render('blogEdit', {
      title: 'Blog Edit',
      pageHeader: {
              blog_title: 'Blog Info'
      },
      blogs: responseBody
  });
};      




var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
 };

/* Book Add */
module.exports.blogAdd = function(req, res) {
    res.render('blogAdd', { title: 'Blog Add' });
};    

/* Book Add Post */
module.exports.blogCreate = function(req, res){
    var requestOptions, path, postdata;
    path = '/api/blogs/';

    postdata = {
        blog_title: req.body.blog_title,
        blog_text: req.body.blog_text
    }; 

    requestOptions = {
      url : apiOptions.server + path,
      method : "POST",
      json : postdata
    };
    
    request(
      requestOptions,
      function(err, response, body) {
         if (response.statusCode === 201) {
              res.redirect('/blogList');
         } else {
             console.log("FUCK SHIT"); 
             _showError(req, res, response.statusCode);
         } 
      }
    ); 
};          






/* Blog Delete */
module.exports.blogDelete = function(req, res) {
  var requestOptions, path;
  path = "/api/blogs/" + req.params.blogid;
  console.log(path);
  requestOptions = {
      url : apiOptions.server + path,
      method : "GET",
      json : {}
  };
  request(
requestOptions,
      function(err, response, body) {
          console.log(body);
          renderDeletePage(req, res, body);
      }
  );
};
/* Render the Blog delete page */
var renderDeletePage = function(req, res, responseBody){
      res.render('blogDelete', {
      title: 'Blog Delete',
      pageHeader: {
          blog_ti: 'Blog Delete'
      },
      blogs: responseBody
  });
};
