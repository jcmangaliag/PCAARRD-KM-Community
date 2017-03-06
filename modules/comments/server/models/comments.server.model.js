import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema({
	referredPost: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	commentedBy: {
		type: String, // mongoose.Schema.Types.ObjectId,
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
	technologyHandle: String
});

export default mongoose.model('Comment', CommentSchema);