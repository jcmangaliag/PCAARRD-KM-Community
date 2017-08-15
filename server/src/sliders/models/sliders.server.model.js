import mongoose from 'mongoose';

let SliderSchema = new mongoose.Schema({
    backgroundImage: {
        type: String,
        required: true
    },
    caption: {
        title: String,
        description: String,
        actionButton: {
            shouldUse: Boolean,
            text: String,
            colorType: String,
            sref: String
        },
        rgbaColor: String
    },
    order: {
        type: Number,
        required: true
    }
});

export default mongoose.model('Slider', SliderSchema);
