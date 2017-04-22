import passport from 'passport';
import mongoose from 'mongoose';
let User = mongoose.model('User');

const userAuthControls = { 
	register : (req, res) => {
		let user = new User(req.body.userFormData);
		user.setPassword(req.body.password);

		user.save((err) => {
			let token = user.generateJwt();
			res.status(200).json({"token": token});
		});
	},
	login : (req, res) => {
	  passport.authenticate('local', (err, user, info) => {
	    // If Passport throws/catches an error
	    if (err) {
	      res.status(404).json(err);
	      return;
	    }

	    // If a user is found
	    if(user){
	      let token = user.generateJwt();
	      res.status(200).json({"token" : token});
	    } else {
	      // If user is not found
	      res.status(401).json(info);
	    }
	  })(req, res);
	}
}

export default userAuthControls;
