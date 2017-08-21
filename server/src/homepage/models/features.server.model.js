import mongoose from 'mongoose';

let FeatureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    icon: {
        type: String
    },
    points: {
        type: Array,
        required: true
    }
});

export default mongoose.model('Feature', FeatureSchema);
