import mongoose from 'mongoose';
const Slider = mongoose.model('Slider');

const sliderControls = {
    getAll : (req, res) => {
        // Fetch all sliders
        Slider.find(function(error, docs){
            if(error) return(error);

            if(!docs.length) {
                // Create default slider instances if no docs are returned
                let defaultSliders = [
                    {
                        backgroundImage: '/groups/assets/images/community.jpg',
                        caption: {
                            title: 'Strong Community',
                            description: 'Build an interactive and solid community driven by purpose, and united in achieving common goals.',
                            actionButton:{
                                shouldUse: false,
                                text: '',
                                sref: ''
                            }
                        },
                        order: 1
                    },
                    {
                        backgroundImage: '/groups/assets/images/fruits-vegetables-collage.jpg',
                        caption: {
                            title: 'Plenty of Groups',
                            description: 'Many groups under crops, livestocks, and many more are there to fulfill your interests. You can join in any of them.',
                            actionButton:{
                                shouldUse: true,
                                text: 'See Groups',
                                sref: 'Groups'
                            }
                        },
                        order: 2
                    },
                    {
                        backgroundImage: '/groups/assets/images/engage-people-conversation.jpg',
                        caption: {
                            title: 'Limitless Conversations',
                            description: 'Engage in learning conversations with other people within your groups. Always try to post something nice and helpful.',
                            actionButton:{
                                shouldUse: true,
                                text: 'Join Now',
                                sref: 'register'
                            }
                        },
                        order: 3
                    }
                ];

                Slider.insertMany(defaultSliders, (error, docs) => {
                    res.send({sliders: docs})
                });
            }
            else res.send({sliders: docs});
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
