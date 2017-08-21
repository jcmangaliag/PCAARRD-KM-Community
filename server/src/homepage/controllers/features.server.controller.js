import mongoose from 'mongoose';
const Feature = mongoose.model('Feature');

const featureControls = {
    getAll : (req, res) => {
        // Fetch all sliders
        Feature.find(function(error, docs){
            if(error) return(error);

            if(!docs.length){
                // Create default slider instances if no docs are returned
                let defaultFeatures = [
                    {
                        title: 'Virtual Spaces / Groups',
                        points: [
                            { text: "Groups are commodities from PCAARRD." },
                            { text: "Groups are classified by industry, sector, ISP, and specific commodity." },
                            { text: "Group members can react and comment on posts." },
                            { text: "Group members can read private posts."}
                        ]
                    },
                    {
                        title: 'Categorized Posts',
                        points: [
                            { text: "Posts are categorized by Question, Incident Report, Event, Media, Advertisement, News, and Others." },
                            { text: "Post's input fields depend on its category." },
                            { text: "Posts can be viewed by category." },
                            { text: "Posts analysis in every group is displayed." }
                        ]
                    },
                    {
                        title: 'Community Feed',
                        points: [
                            { text: "Community Feed is composed of latest posts from the joined groups." },
                            { text: "Community Feed allows reacting to posts without going to the groups." },
                            { text: "Community Feed is always up-to-date." }
                        ]
                    }
                ];

                Feature.insertMany(defaultFeatures, (error, docs) => {
                    res.send({features: docs})
                });
            }
            else res.send({features: docs});
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
