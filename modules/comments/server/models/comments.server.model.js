import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema({
	referredPost: {
		type: String,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	commentedBy: {
		type: String,
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
	thumbsUpUsers: Array,
	happyUsers: Array,
	sadUsers: Array,
	angryUsers: Array
});

export default mongoose.model('Comment', CommentSchema);