var express = require('express');
var router = express.Router();
var homeLocations = require('../controllers/home');
var blogLocations = require('../controllers/blog');


/* Route to home pages. */
router.get('/', homeLocations.home);


/* Routes to blog pages. */
router.get('/blog', blogLocations.blog);
router.get('/blogList', blogLocations.blogList);
router.get('/blogAdd', blogLocations.blogAdd);
router.get('/blogEdit', blogLocations.blogEdit);
router.get('/blogDelete', blogLocations.blogDelete);



module.exports = router;
