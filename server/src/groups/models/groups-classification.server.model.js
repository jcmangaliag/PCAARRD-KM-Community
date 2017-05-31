import mongoose from 'mongoose';

const GroupClassificationSchema = mongoose.Schema({
	industry: String,
	sector: String,
	isp: String,
	specificCommodity: String,
	organization: String,
	isps: Array,
	isUsed: {
		type: Boolean,
		required: true
	},
	type: {
		type: String,
		required: true
	}
});

export default mongoose.model('GroupClassification', GroupClassificationSchema);