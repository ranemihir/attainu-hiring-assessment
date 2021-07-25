import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: {
		type: String
	},
	encryptedPassword: {
		type: String
	},
	token: {
		type: String
	},
	role: {
		type: String,
		enum: ['STUDENT', 'ADMIN'],
		default: 'STUDENT'
	}
});

const User = mongoose.model('User', userSchema);

export default User;