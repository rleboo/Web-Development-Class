var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
console.log("What the hell");
console.log(process.env.JWT_SECRET); 
var auth = jwt({   // Lab 6
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});


var blogLocations = require('../controllers/blog');
var ctrlAuth = require('../controllers/authentication');

router.post('/blogs/', auth, blogLocations.blogCreate);

router.get('/blogs/:blogid', blogLocations.blogReadOne);
router.get('/blogs/', blogLocations.blogList);

router.put('/blogs/:blogid', auth, blogLocations.blogUpdate);
router.put('/blogComment/:blogid', blogLocations.blogComment);

router.put('/commentEdit/:blogid', blogLocations.commentEdit);


router.delete('/blogs/:blogid', auth, blogLocations.blogDelete);

router.put('/commentRemove/:blogid', blogLocations.blogCommentDelete);

router.post('/register', ctrlAuth.register);

router.post('/login', ctrlAuth.login); 


module.exports = router;
