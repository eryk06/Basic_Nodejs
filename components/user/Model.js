const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
	id: { type: ObjectId }, // Khoá chính
	name: { type: String },
	email: { type: String, require: true, unique: true },
	password: { type: String, require: true },
});

module.exports = mongoose.models.user || mongoose.model('user', userSchema);
