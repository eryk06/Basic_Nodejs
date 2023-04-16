var express = require('express')
var router = express.Router()
const productController = require('../../components/product/Controller')
const categoryController = require('../../components/category/Controller')
const upload = require('../../middle/UploadFile')
const auth = require('../../middle/Authen')
const UploadFile = require('../../middle/UploadFile')

// http://localhost:3000/cpanel/products
// hiển thị trang danh sách sẩn phẩm
router.get('/', async (req, res, next) => {
	try {
		const products = await productController.getAllProducts()
		res.render('product/list', { products })
	} catch (error) {
		next(error)
	}
})
// http://localhost:3000/cpanel/products/:id/delete
router.get('/:id/delete', async (req, res, next) => {
	try {
		const { id } = req.params
		const result = await productController.deleteProductById(id)
		return res.json({ result })
	} catch (error) {
		return res.json({ result: false })
	}
})

// http://localhost:3000/cpanel/products/new
router.get('/new', async (req, res, next) => {
	try {
		const categories = await categoryController.getAllCategories()
		res.render('product/new', { categories })
	} catch (error) {
		next(error)
	}
})

// http://localhost:3000/cpanel/products/new
// Xử lý thêm mới sản phẩm
router.post('/new', [upload.single('image')], async (req, res, next) => {
	try {
		console.log(req.file)
		let { file, body } = req
		if (file) {
			file = `http://192.19.84.78:3000/images/${file.filename}`
			body = { ...body, image: file }
		}
		const { name, price, quantity, category, image } = body
		const result = await productController.addProduct(name, price, quantity, image, category)
		if (result) {
			return res.redirect('/cpanel/products')
		}
		return res.redirect('/cpanel/products/new')
	} catch (error) {
		next(error)
	}
})

// http://localhost:3000/cpanel/products/:id/edit
// hiển thị trang sửa sản phẩm
router.get('/:id/edit', async (req, res, next) => {
	try {
		const { id } = req.params
		const product = await productController.getProductById(id)
		let categories = await categoryController.getAllCategories()
		categories = categories.map((item) => {
			item.selected = false
			if (item._id == product.category) item.selected = true
			return item
		})
		res.render('product/edit', { product, categories })
	} catch (error) {
		next(error)
	}
})

// http://localhost:3000/cpanel/products/:id/edit
// Xử lí sửa sản phẩm
router.post(
	'/:id/edit',

	[upload.single('image')],
	async (req, res, next) => {
		try {
			let { id } = req.params
			let { file, body } = req
			if (file) {
				file = `http://192.19.84.78:3000/images/${file.filename}`
				body = { ...body, image: file }
			}
			const { name, price, quantity, image, category } = body
			const result = await productController.updateProductId(id, name, price, quantity, image, category)
			if (result) {
				res.redirect('/cpanel/products')
			}
			return res.redirect('/cpanel/products')
		} catch (error) {
			console.log('Update product error: ', error)
			next(error)
		}
	}
)

module.exports = router
