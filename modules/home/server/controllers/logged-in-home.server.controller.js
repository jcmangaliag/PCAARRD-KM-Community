import mongoose from 'mongoose';
import Todo from '../models/logged-in-home.server.model';

const loggedInHome = { 
	list : (req, res) => {
		Todo.find((err, results) => {
	        if (err) { console.log(err); }

	        res.send({ todos: results });
	    });
	},
	post : (req, res) => {
		const todo = new Todo(req.body);
		todo.save((err) => {
			if (err) { console.log(err); }

			res.send('ToDo saved');
		});
	},
	update : (req, res) => {
		const id = req.params.id;
		Todo.update({ _id: mongoose.Types.ObjectId(id) }, {
			$set: { task: req.body.task }
		}, (err) => {
			if (err) { console.log(err); };

			res.send("ToDo updated");
		});
	},
	remove : (req, res) => {
		const id = req.params.id;
		Todo.remove({ _id: mongoose.Types.ObjectId(id) }, (err) => {
			if (err) { console.log(err); };

			res.send("ToDo deleted");
		});
	}
}

export default loggedInHome;
