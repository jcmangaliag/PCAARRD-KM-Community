import passport from 'passport';
import mongoose from 'mongoose';
import crypto from 'crypto';
let User = mongoose.model('User');

const userAuthControls = { 
	register : (req, res) => {
		let user = new User(req.body.userFormData);
		user.setPassword(req.body.password);
		if (req.body.enteredKey){
			if (process.env.ADMIN_REG_ACCESS_HASH !== crypto.pbkdf2Sync(req.body.enteredKey, process.env.ADMIN_REG_ACCESS_SALT, 1000, 64).toString('hex')){
				res.status(401).json({message: 'Invalid Access Key!'});
				return;
			}
		}

		user.save((err) => {
			if (err) { return (err); }

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
	},
	allowAdminRegistration: (req, res) => {
		const enteredHash = crypto.pbkdf2Sync(req.body.enteredKey, process.env.ADMIN_REG_ACCESS_SALT, 1000, 64).toString('hex');
		if (enteredHash === process.env.ADMIN_REG_ACCESS_HASH){
			res.status(200).json({"allow": true});
		} else{
			res.status(401).json({"allow": false});
		}
	}
}

export default userAuthControls;
