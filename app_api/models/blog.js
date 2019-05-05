
var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
	comment_text: {type: String, required: true},
	email: {type: String, required: true},
	name: {type: String, required: true}
});

var blogSchema = new mongoose.Schema({
	blog_title: {type: String, required: true},
	blog_text: {type: String, required: true},
	email: {type: String, required: true},
	name: {type: String, required: true},
	createdOn: {
	  type: String,
	  "default": Date.now.toString()
	},
	comment: [commentSchema]
});

mongoose.model('Blog', blogSchema);
