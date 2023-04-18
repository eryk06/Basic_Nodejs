var express = require('express');
var router = express.Router();
const userController = require('../components/user/Controller');
const productController = require('../components/product/Controller');
const jwt = require('jsonwebtoken');
const auth = require('../middle/Authen');

// http://localhost:3000
// Hiển thị trang trang chủ
router.get('/', [auth.authenWeb], async (req, res, next) => {
  res.render('index');
});

// http://localhost:3000/login
// Hiển thị trang login
router.get('/login', [auth.authenWeb], async (req, res, next) => {
  res.render('user/login');
});

// http://localhost:3000/logout
router.get('/logout', [auth.authenWeb], async (req, res, next) => {
  req.session.destroy();
  res.redirect('/login');
});

router.get('/product', [auth.authenWeb], async (req, res, next) => {
  try {
    const products = await productController.getAllProducts();
    res.render('product/list', { products });
  } catch (error) {
    next(error);
  }
});

// http://localhost:3000/login
// Xử lý trang login
// Kiểm tra email, password, thành công chuyển sang trang chủ, ngược lại chuyển sang trang login
router.post('/login', [auth.authenWeb], async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await userController.login(email, password);
    // Lưu thông tin vào session
    if (result) {
      const token = jwt.sign({ _id: result._id }, 'secret');
      req.session.token = token;
      return res.redirect('/');
    } else {
      return res.redirect('/login');
    }
  } catch (error) {
    console.log('Login error: ', error);
    return res.redirect('/login');
  }
});

module.exports = router;

/**
 * req, res, next
 * req: request (yêu cầu gửi từ client)
 * - req.query: query string (dữ liệu gửi lên url)
 * - req.body: body (dữ liệu gửi lên từ form)
 * - req.params: params (dữ liệu gửi lên url)
 * res: response (phản hồi từ server)
 * - res.render: render ra view (WEB)
 * - res.json: trả về dữ liệu dạng json (API)
 * - res.send: trả về dữ liệu dạng text (API)
 * - res.redirect: chuyển hướng (WEB)
 * next: hàm tiếp theo
 */

/**
 * HTTP Request Methods
 * Get: Lấy dữ liệu (url + enter)
 * Post: Tạo dữ liệu (form + submit)
 */
