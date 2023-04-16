const productService = require('./Service');

const getAllProducts = async () => {
	try {
		return await productService.getAllProducts();
	} catch (error) {
		console.log('🚀 ~ Get all product error:', error);
		throw error;
	}
};

const deleteProductById = async (id) => {
	try {
		return await productService.deleteProductById(id);
	} catch (error) {
		console.log('🚀 ~ Delete product error:', error);
		return false;
	}
};

const addProduct = async (name, price, quantity, image, category) => {
	try {
		return await productService.addProduct(
			name,
			price,
			quantity,
			image,
			category
		);
	} catch (error) {
		return false;
	}
};

const getProductById = async (id) => {
	try {
		return await productService.getProductById(id);
	} catch (error) {
		console.log('Get product bi id error: ', error);
	}
	return null;
};

const updateProductId = async (id, name, price, quantity, image, category) => {
	try {
		return await productService.updateProductById(
			id,
			name,
			price,
			quantity,
			image,
			category
		);
	} catch (error) {
		console.log('Update product bi id error: ', error);
	}
	return false;
};

const searchProduct = async (name) => {
	try {
		return await productService.searchProduct(name);
	} catch (error) {
		console.log('🚀 ~ Search product error:', error);
	}
	return null;
};

module.exports = {
	getAllProducts,
	deleteProductById,
	addProduct,
	getProductById,
	updateProductId,
	searchProduct,
};
