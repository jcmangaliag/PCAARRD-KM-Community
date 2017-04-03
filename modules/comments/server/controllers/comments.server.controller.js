import Comment from '../models/comments.server.model';

const commentControls = { 
	listByReferredPost : (req, res) => {
		const referredPost = req.params.referredPost;

		Comment.find({referredPost}, (err, results) => {
	        if (err) { console.log(err); }

	        res.send({ comments: results });
	    });
	},
	listByUserComments : (req, res) => {
		const referredPost = req.params.referredPost;
		//const commentedBy = req.params.commentedBy;
		const commentedBy = "Mark Eric Cabanli";	// temporary

		Comment.find({referredPost, commentedBy}, (err, results) => {
	        if (err) { 
	        	return (err); 
	        } else if (results === null) { 
	        	return res.status(404).send('Comments not found!'); 
	        }

	        res.send({ comments: results });
	    });
	},
	listOne : (req, res) => {
		const id = req.params.id;

		Comment.findById(id, (err, result) => {
			if (err) { 
				return (err);  
			} else if (result === null) { 
				return res.status(404).send('Comment not found!'); 
			}

			res.send({comment: result});
		});
	},
	post : (req, res) => {
		const comment = new Comment(req.body);
		comment.save((err) => {
			if (err) { console.log(err); }

			res.send('Comment saved.');
		});
	},
	updateReactions : (req, res) => {
		const id = req.params.id;

		Comment.findByIdAndUpdate(id, { reactions: req.body.reactions }, (err) => {
			if (err) { console.log(err); };

			res.send("Comment updated");
		});
	},
	removeOne : (req, res) => {
		const id = req.params.id;

		Comment.findByIdAndRemove(id, (err, result) => {
			if (err) { 
				return (err); 
			} else if (result === null) { 
				return res.status(404).send('Comment not found!'); 
			}

			res.send("Comment deleted.");
		});
	},
	removeByReferredPost: (req, res) => {
		const referredPost = req.params.referredPost;

		Comment.remove({referredPost}, (err, result) => {
			if (err) { return (err); }

			res.send("Comments deleted.");
		});
	}
}

export default commentControls;