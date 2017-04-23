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
	photo: Object,
	coverPhoto: Object,
	dateCreated: {
	   type: String,
       required: true
    },
    postsCount: {
    	type: Object,
    	required: true
    },
    membersCount: {
    	type: Number,
    	required: true
    },
    createdBy: {
    	type: String,
    	required: true
    }
});

export default mongoose.model('Group', GroupSchema);