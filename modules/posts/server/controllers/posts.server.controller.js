import Post from '../models/posts.server.model';

const postControls = { 
	list : (req, res) => {	// not in front end
		Post.find((err, results) => {
	        if (err) { return (err); }

	        res.send({ posts: results });
	    });
	},
	listByCategory : (req, res) => {	// not in front end
		Post.find({category: req.params.category}, (err, results) => {
	        if (err) { return (err); }

	        res.send({ posts: results });
	    });
	},
	listByGroupBelonged : (req, res) => {
		let query = {groupBelonged: req.params.handle};

		if (req.query && req.query.showPublic){
			query.showPublic = req.query.showPublic;
		}

		Post.find(query, (err, results) => {
	        if (err) { return (err); }

	        res.send({ posts: results });
	    });
	},
	listByGroupBelongedAndCategory : (req, res) => {
		let query = {groupBelonged: req.params.handle, category: req.params.category};

		if (req.query && req.query.showPublic){
			query.showPublic = req.query.showPublic;
		}

		Post.find(query, (err, results) => {
	        if (err) { return (err); }

	        res.send({ posts: results });
	    });
	},
	listByMyGroups : (req, res) => {
		const myGroups = req.params.myGroups.split(',');
		Post.find({groupBelonged: { $in: myGroups}}, (err, results) => {
	        if (err) { return (err); }

	        res.send({ posts: results });
	    });
	},
	listByMyGroupsAndCategory : (req, res) => {
		const myGroups = req.params.myGroups.split(',');

		Post.find({groupBelonged: {$in: myGroups}, category: req.params.category}, (err, results) => {
	        if (err) { return (err); }

	        res.send({ posts: results });
	    });
	},
	listByUser : (req, res) => {
		Post.find({'postedBy._id': req.params.userID, showPublic: true}, (err, results) => {
	        if (err) { return (err); }

	        res.send({ posts: results });
	    });
	},
	listByUserAndCategory : (req, res) => {
		Post.find({'postedBy._id': req.params.userID, category: req.params.category, showPublic: true}, (err, results) => {
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
