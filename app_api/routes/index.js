var express = require('express');
var router = express.Router();
var homeLocations = require('../controllers/home');
var blogLocations = require('../controllers/blog');

/* Route to home pages. */
router.get('/', homeLocations.home);

/* Blog api. */
//router.get('/blogList', blogLocations.blogList);
router.post('/blogs/:blogid', blogLocations.blogCreate);

router.get('/blogs/:blogid', blogLocations.blogReadOne);
router.get('/blogs/:blogid', blogLocations.blogList);

router.put('/blogs/:blogid', blogLocations.blogUpdate);

router.delete('/blogs/:blogid', blogLocations.blogDelete);

///'/blogs/:blogid'

module.exports = router;
