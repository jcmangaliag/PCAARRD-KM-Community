import mongoose from 'mongoose';

const GroupSchema = mongoose.Schema({
	classification: {
		type: Object,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	handle: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	admin: {
		type: Array,
		required: true
	},
	membership: {
		type: String,
		required: true
	},
	photo: {
		type: String,
		required: true
	},
	coverPhoto: {
		type: String,
		required: true
	},
	dateCreated: {
	   type: String,
       required: true
    },
    membersCount: {
	   type: Number,
       required: true
    },
    members: {
	   type: Array,
       required: true
    },
    postsCount: {
    	type: Object,
    	required: true
    }
});

export default mongoose.model('Group', GroupSchema);