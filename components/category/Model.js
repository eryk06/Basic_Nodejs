const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const categorySchema = new Schema({
	id: { type: ObjectId }, // Khoá chính
	name: {
		type: String, // Bắt buộc có
		required: true, // Không trùng
		unique: true, // Xóa khoảng trắng ở đầu và cuối
		minlenth: 3, // Độ dài tối thiểu
		maxlenth: 255, // Độ dài tối đa
		default: 'No name', // Gía trị mặc định
	},
});

module.exports =
	mongoose.models.category || mongoose.model('category', categorySchema);

// category -----> categories
/**
 * Database ----- Database
 * Table -------- Collection
 * Row ---------- Document
 * Column ------- Field
 */
