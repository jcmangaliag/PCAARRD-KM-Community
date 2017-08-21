import mongoose from 'mongoose';
const Feature = mongoose.model('Feature');

const featureControls = {
    getAll : (req, res) => {
        // Fetch all sliders
        Feature.find(function(error, docs){
            if(error) return(error);

            res.send({features: docs});
        });
    },
    edit : (req, res) => {
        // Update a slider
        const id = req.params.featureId;

        Feature.findByIdAndUpdate(id, req.body, function(error){
        	if(error) console.log(error);

        	res.send("Feature updated");
        });
    }
}

export default featureControls;
