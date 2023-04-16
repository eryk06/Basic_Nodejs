var express = require('express');
var router = express.Router();
const productController = require('../../components/product/Controller');
const { authenAPI } = require('../../middle/Authen');

// http://localhost:3000/api/products

// http://localhost:3000/api/products/get-all
router.get('/get-all', [authenAPI], async (req, res, next) => {
	try {
		const products = await productController.getAllProducts();
		return res.status(200).json({ result: true, products });
	} catch (error) {
		return res.status(500).json({ result: false, products: null });
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const products = await productController.getProductById(id);
		res.status(200).json({ result: true, products });
	} catch (error) {
		res.status(500).json({});
	}
});

// http://localhost:3000/api/products/search?name=iphone
router.get('/search', async (req, res, next) => {
	try {
		const { name } = req.body;
		const products = await productController.searchProduct(name);
		return res.status(200).json({ result: true, products });
	} catch (error) {
		return res.status(500).json({ result: false, products: null });
	}
});

module.exports = router;
