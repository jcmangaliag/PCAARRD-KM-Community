import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

let UserSchema = mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	hash: String,
	salt: String,
	name: {
		type: Object,
		required: true
	},
	isAdmin: {
		type: Boolean,
		required: true
	},
	photo: Object,
	dateJoined: {
		type: String,
		required: true
	},
	sex: {
		type: String,
		required: true
	},
	birthdate: {
		type: String,
		required: true
	},
	contactNumber: String,
	country: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	about: String,
	groupsJoined: Array
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
}

UserSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
}

UserSchema.methods.generateJwt = function() {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    isAdmin: this.isAdmin,
    exp: parseInt(expiry.getTime() / 1000)
  }, "MY_SECRET"); 
}

export default mongoose.model('User', UserSchema);