
var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
	blog_title: {type: String, required: true},
	blog_text: {type: String, required: true},
	email: {type: String, required: true},
	name: {type: String, required: true},
	createdOn: {
	  type: String,
	  "default": Date.now.toString()
	}
});

mongoose.model('Blog', blogSchema);
