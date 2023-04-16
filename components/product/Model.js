const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
	id: { type: ObjectId }, // Khoá chính
	name: { type: String }, // Bắt buộc có,
	price: { type: Number },
	quantity: { type: Number },
	image: { type: String },
	caterogy: { type: ObjectId, ref: 'caterogy' }, // Khóa ngoại
});

module.exports =
	mongoose.models.product || mongoose.model('product', productSchema);

// product -----> products
/**
 * Database ----- Database
 * Table -------- Collection
 * Row ---------- Document
 * Column ------- Field
 */
