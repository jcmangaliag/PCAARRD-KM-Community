import mongoose from 'mongoose';
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
	}
}

export default commentControls;