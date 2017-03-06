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
	files: Array,
	technologyHandle: String,
	question: String,
	description: String,
	adTitle: String,
	details: String,
	post: String,
	newsTitle: String,
	authors: Array,
	newsBody: String,
	price: String,
	mediaTitle: String,
	mediaType: String,
	urls: Array,
	reportTitle: String,
	dateTime: String,
	location: String,
	details: String,
	eventName: String,
	startDateTime: String,
	endDateTime: String,
	audience: String

});

export default mongoose.model('Post', PostSchema);