import mongoose from 'mongoose';

const GroupClassificationSchema = mongoose.Schema({
	industry: {
		type: String,
		required: true
	},
	sector: {
		type: String,
		required: true
	},
	isp: {
		type: String,
		required: true
	},
	specificCommodity: String

});

export default mongoose.model('GroupClassification', GroupClassificationSchema);