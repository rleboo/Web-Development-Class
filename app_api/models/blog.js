
var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
	blog_title: {type: String, required: true},
	blog_text: {type: String, required: true},
	createdOn: {
	  type: Date,
	  "default": Date.now
	}
});

mongoose.model('Blog', blogSchema);
