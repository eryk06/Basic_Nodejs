const categoryService = require('./Service');

const getAllCategories = async () => {
	try {
		return categoryService.getAllCategories();
	} catch (error) {}
};

module.exports = { getAllCategories };
