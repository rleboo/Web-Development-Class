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

/* Book Edit Post */
module.exports.postblogEdit = function(req, res){
  var requestOptions, path, postdata;
  var id = req.params.blogid;
  path = '/api/blogs/' + id;

  postdata = {
      blog_title: req.body.blog_title,
      blog_text: req.body.blog_text
  };
  requestOptions = {
      url : apiOptions.server + path,
      method : "PUT",
      json : postdata
  };

  request(
requestOptions,
      function(err, response, body) {
          if (response.statusCode === 201) {
              res.redirect('/blogList');
          } else {
              _showError(req, res, response.statusCode);
          }
      }
  );
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
              console.log(response.statusCode);
              res.redirect('/blogList');
         } else {
             console.log(body); 
             _showError(req, res, response.statusCode);
             console.log(body);
         } 
      }
    ); 
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




/* Blog Delete */
module.exports.getblogDelete = function(req, res) {
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

/* Blog Delete Post */
module.exports.blogDelete = function(req, res){
  var requestOptions, path, postdata;
  var id = req.params.blogid;
  path = '/api/blogs/' + id;

  requestOptions = {
      url : apiOptions.server + path,
      method : "DELETE",
      json : {}
  };
  request(
      requestOptions,
      function(err, response, body) {
          if (response.statusCode === 204) {
              res.redirect('/blogList');
          } else {
              _showError(req, res, response.statusCode);
          }
      }
  );
};                    

