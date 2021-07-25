import mongoose from 'mongoose';

const POST_MAX_LENGTH = process.env.POST_MAX_LENGTH;

const postSchema = new mongoose.Schema({
	data: {
		type: String,
		trim: true,
		default: null,
		maxlength: POST_MAX_LENGTH
	}
});

const Post = mongoose.model('Post', postSchema);

export default Post;