import Comment from '../models/comments.server.model';

const commentControls = { 
	list : (req, res) => {
		Comment.find((err, results) => {
	        if (err) { console.log(err); }

	        res.send({ comments: results });
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
	}
}

export default commentControls;