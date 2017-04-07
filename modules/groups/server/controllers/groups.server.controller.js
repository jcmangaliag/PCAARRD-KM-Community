import Group from '../models/groups.server.model';
import GroupClassification from '../models/groups-classification.server.model';

const postControls = { 
	list : (req, res) => {
		Post.find((err, results) => {
	        if (err) { return (err); }

	        res.send({ posts: results });
	    });
	},
	listByCategory : (req, res) => {
		Post.find({category: req.params.category}, (err, results) => {
	        if (err) { return (err); }

	        res.send({ posts: results });
	    });
	},
	listOne : (req, res) => {
		const id = req.params.id;

		Post.findById(id, (err, result) => {
			if (err) { 
				return (err);  
			} else if (result === null) {
				return res.status(404).send('Post not found!');
			}
			
			res.send({post: result});
		});
	},
	post : (req, res) => {
		const post = new Post(req.body);
		post.save((err) => {
			if (err) { return (err); }

			res.send('Post saved.');
		});
	},
	updateReactions : (req, res) => {
		const id = req.params.id;

		Post.findByIdAndUpdate(id, { reactions: req.body.reactions }, (err) => {
			if (err) { return (err); }

			res.send("Post updated.");
		});
	},
	removeOne : (req, res) => {
		const id = req.params.id;

		Post.findByIdAndRemove(id, (err, result) => {
			if (err) { return (err); }

			res.send("Post deleted.");
		});
	}
}

export default postControls;
