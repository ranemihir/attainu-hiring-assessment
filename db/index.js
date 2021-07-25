import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
	console.log('Connection successful with mnogdb');
});