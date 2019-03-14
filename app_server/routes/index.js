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
router.post('/blogAdd', blogLocations.blogCreate);

router.get('/blogEdit/:blogid', blogLocations.blogEdit);
router.post('/blogEdit/:blogid', blogLocations.postblogEdit)

router.get('/blogDelete/:blogid', blogLocations.getblogDelete);
router.post('/blogDelete/:blogid', blogLocations.blogDelete)

module.exports = router;
