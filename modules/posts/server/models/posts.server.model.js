import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
	category: {
		type: String,
		required: true
	},
	groupBelonged: {
		type: String,
		required: true
	},
	postedBy: {
		type: String,
		required: true
	},
	datePosted: {
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
	question: String,
	description: String,
	files: Array,
	adTitle: String,
	details: String
});

export default mongoose.model('Post', PostSchema);