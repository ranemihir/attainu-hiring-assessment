import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	encryptedPassword: {
		type: String,
		required: true,
	},
	token: {
		type: String,
		required: true,
		unique: true
	},
	role: {
		type: String,
		required: true,
		enum: ['STUDENT', 'ADMIN'],
		default: 'STUDENT'
	}
});

const User = mongoose.model('User', userSchema);

export default User;