import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/community');
console.log("ang mongolab uri ay")
console.log(process.env.MONGOLAB_URI)