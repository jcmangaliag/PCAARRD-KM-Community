import Comment from '../models/comments.server.model';

const commentControls = { 
	list : (req, res) => {
		Comment.find((err, results) => {
	        if (err) { console.log(err); }

	        res.send({ comments: results });
	    });
	},
	listOne : (req, res) => {
		const id = req.params.id;

		Comment.findById(id, (err, result) => {
			if (err) { return (err);  }
			if (result === null) return res.status(404).send('Comment not found!');
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
			if (err) { return (err); }

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