var express = require('express');
var router = express.Router();
var jwt = require('express-jwt'); 
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

router.delete('/blogs/:blogid', auth, blogLocations.blogDelete);

module.exports = router;
