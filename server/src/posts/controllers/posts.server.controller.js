import Post from '../models/posts.server.model';

const postControls = { 
	list : (req, res) => {	// get all posts
		Post.find((err, results) => {
	        if (err) { return (err); }

	        res.send({ posts: results });
	    });
	},
	listByCategory : (req, res) => {	// get posts by category
		Post.find({category: req.params.category}, (err, results) => {
	        if (err) { return (err); }

	        res.send({ posts: results });
	    });
	},
	listByGroupBelonged : (req, res) => {	// get all posts or public posts only by group 
		let query = {groupBelonged: req.params.handle};

		if (req.query && req.query.showPublic){
			query.showPublic = req.query.showPublic;
		}

		Post.find(query, (err, results) => {
	        if (err) { return (err); }

	        res.send({ posts: results });
	    });
	},
	listByGroupBelongedAndCategory : (req, res) => {	// get all posts or public posts only by category and group
		let query = {groupBelonged: req.params.handle, category: req.params.category};

		if (req.query && req.query.showPublic){
			query.showPublic = req.query.showPublic;
		}

		Post.find(query, (err, results) => {
	        if (err) { return (err); }

	        res.send({ posts: results });
	    });
	},
	listByMyGroups : (req, res) => {	// get all posts by given groups
		const myGroups = req.params.myGroups.split(',');
		Post.find({groupBelonged: { $in: myGroups}}, (err, results) => {
	        if (err) { return (err); }

	        res.send({ posts: results });
	    });
	},
	listByMyGroupsAndCategory : (req, res) => {	// get posts by given groups and category
		const myGroups = req.params.myGroups.split(',');

		Post.find({groupBelonged: {$in: myGroups}, category: req.params.category}, (err, results) => {
	        if (err) { return (err); }

	        res.send({ posts: results });
	    });
	},
	listByUser : (req, res) => {	// get all public posts by user
		Post.find({'postedBy._id': req.params.userID, showPublic: true}, (err, results) => {
	        if (err) { return (err); }

	        res.send({ posts: results });
	    });
	},
	listLengthByUser : (req, res) => {	// get no. of posts by user
		Post.find({'postedBy._id': req.params.userID}).count((err, count) => {
	        if (err) { return (err); }

	        res.send({ postsLength: count });
	    });
	},
	listByUserAndCategory : (req, res) => {	// get no. of posts by user and category
		Post.find({'postedBy._id': req.params.userID, category: req.params.category, showPublic: true}, (err, results) => {
	        if (err) { return (err); }

	        res.send({ posts: results });
	    });
	},
	listOne : (req, res) => {	// get one post
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
	post : (req, res) => {	// add one post
		const post = new Post(req.body);
		post.save((err) => {
			if (err) { return (err); }

			res.send('Post saved.');
		});
	},
	updateReactions : (req, res) => {	// modify the reactions of a post
		const id = req.params.id;

		Post.findByIdAndUpdate(id, { reactions: req.body.reactions }, (err) => {
			if (err) { return (err); }

			res.send("Post updated.");
		});
	},
	removeOne : (req, res) => {	// delete one post
		const id = req.params.id;

		Post.findByIdAndRemove(id, (err, result) => {
			if (err) { return (err); }

			res.send("Post deleted.");
		});
	}
}

export default postControls;
