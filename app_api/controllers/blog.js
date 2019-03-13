var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var Blog = mongoose.model('Blog');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };
    
  /* GET a location by the id */
module.exports.blogReadOne = function(req, res) {
  console.log('Finding Blog details', req.params);
  if (req.params && req.params.blogid) {
    Blog
      .findById(req.params.blogid)
      .exec(function(err, blog) {
        if (!blog) {
          sendJSONresponse(res, 404, {
            "message": "blogid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(blog);
        sendJSONresponse(res, 200, blog);
      });
  } else {
    console.log('No blogid specified');
    sendJSONresponse(res, 404, {
      "message": "No blogid in request"
    });
  }
};

/* GET a list of all blogs */
module.exports.blogList = function(req, res) {
  console.log('Getting Blog list');
  Blog
      .find()
      .exec(function(err, results) {
        if (!results) {
          sendJSONresponse(res, 404, {
            "message": "no blog found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(results);
        sendJSONresponse(res, 200, buildBlogList(req, res, results));
      }); 
};

//Takes the JSON file and places it into new array
var buildBlogList = function(req, res, results) {
  var blogs = [];
  results.forEach(function(obj) {
    blogs.push({
      blog_title: obj.blog_title,
      blog_text: obj.blog_text,
      //date: obj.createdOn,
      _id: obj._id
    });
  });
  return blogs;
};


/* POST a new blog */
module.exports.blogCreate = function(req, res) {
  console.log(req.body);
  Blog
    //Calls MongoBb .create functino
   .create({
      blog_title: req.body.blog_title,
      blog_text: req.body.blog_text
      //date: req.body.createdOn
     }, function(err, blog) {
       if (err) {
          console.log(err);
          sendJSONresponse(res, 400, err);
       } else {
          console.log(blog);
          sendJSONresponse(res, 201, blog);
       }
     }
   );
};          

/* Update blog entry */
module.exports.blogUpdate = function(req, res) {
  console.log("Updating a blog entry with id of " + req.params.blogid);
  console.log(req.body);  
  Blog
    .findOneAndUpdate(
     { _id: req.params.blogid },
      { $set: {"blog_title": req.body.blog_title}},
      { $set: {"blog_text": req.body.blog_text}},
     function(err, response) {
         if (err) {
            console.log("An error occured");
            sendJSONresponse(res, 400, err);
         } else {
          console.log("Succesful");
          sendJSONresponse(res, 201, response);
        }
    }
  );
};

/* Delete one Blog */
module.exports.blogDelete = function(req, res) {
  console.log("Deleting blog entry with id of " + req.params.id);
  console.log(req.body);
  Blog
      .findByIdAndRemove(req.params.id)
      .exec (
          function(err, response) {
              if (err) {
                          sendJSONresponse(res, 404, err);
              } else {
                          sendJSONresponse(res, 204, null);
              }
          }
      );
};                