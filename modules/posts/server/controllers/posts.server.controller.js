import Post from '../models/posts.server.model';

const postControls = { 
	list : (req, res) => {
		Post.find((err, results) => {
	        if (err) { console.log(err); }

	        res.send({ posts: results });
	    });
	},
	listByCategory : (req, res) => {
		Post.find({category: req.params.category}, (err, results) => {
	        if (err) { console.log(err); }

	        res.send({ posts: results });
	    });
	},
	listOne : (req, res) => {
		const id = req.params.id;

		Post.findById(id, (err, result) => {
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

		Post.findByIdAndUpdate(id, { reactions: req.body.reactions }, (err) => {
			if (err) { console.log(err); };

			res.send("Post updated");
		});
	}
}

export default postControls;
