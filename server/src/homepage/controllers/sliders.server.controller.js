import mongoose from 'mongoose';
const Slider = mongoose.model('Slider');

const sliderControls = {
    getAll : (req, res) => {
        // Fetch all sliders
        Slider.find(function(error, docs){
            if(error) return(error);

            res.send({sliders: docs});
        });
    },
    edit : (req, res) => {
        // Update a slider
        const id = req.params.sliderId;

        Slider.findByIdAndUpdate(id, req.body, function(error){
        	if(error) console.log(error);

        	res.send("Slider updated");
        });
    },
    delete : (req, res) => {
        // Delete a slider
        const id = req.params.sliderId;

        Slider.findByIdAndRemove(id, function(error, result){
        	if(error) return (error);
        	else if (result === null) return res.status(404).send('Slider not found!');

        	res.send("Slider deleted.");
        });
    }
}

export default sliderControls;
