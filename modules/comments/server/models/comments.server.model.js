import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema({
	referredPost: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	groupBelonged: {
		type: String,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	commentedBy: {
		type: Object, 
		required: true
	},
	dateCommented: {
	   type: String,
       required: true
    },
    hashtags: {
		type: Array,
		required: true
	},
	reactions: {
		type: Array,
		required: true
	},
	technologyHandles: Array,
	files: Array
});

export default mongoose.model('Comment', CommentSchema);