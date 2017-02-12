import mongoose from 'mongoose';
import Post from '../models/posts.server.model';

const postControls = { 
	list : (req, res) => {
		Post.find((err, results) => {
	        if (err) { console.log(err); }

	        res.send({ posts: results });
	    });
	},
	listOne : (req, res) => {
		const id = req.params.id;

		Post.findOne({_id: mongoose.Types.ObjectId(id)}, (err, result) => {
			if (err) { console.log(err); };

			res.send({post: result});
		});
	},
	post : (req, res) => {
		const post = new Post(req.body);
		post.save((err) => {
			if (err) { console.log(err); }

			res.send('Post saved.');
		});
	},
	updateReactions : (req, res) => {
		const id = req.params.id;
		Post.update({ _id: mongoose.Types.ObjectId(id) }, {
			$set: { reactions: req.body.reactions }
		}, (err) => {
			if (err) { console.log(err); };

			res.send("Post updated");
		});
	},
}

export default postControls;