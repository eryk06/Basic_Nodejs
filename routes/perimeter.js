var express = require('express');
var router = express.Router();

// http://localhost:3000/hinh-chu-nhat?&a=10&b=20
router.post('/', async function (req, res, next) {
	const { a, b } = req.query;
	const { loai_Hinh } = req.body;
	let kq = '';
	let thongSo = '';
	let hinh = '';
	switch (loai_Hinh) {
		case 'hinh-chu-nhat':
			if (a <= 0 || b <= 0) {
				kq = 'Không thể tính';
			} else {
				kq = (Number(a) + Number(b)) * 2;
			}
			thongSo = `a = ${a}, b = ${b}`;
			hinh = 'Chữ nhật';
			break;
		case 'hinh-tron':
			if (r < 0) {
				kq = 'Không thể tính';
			} else {
				kq = r * 2 * 3.14;
			}
			thongSo = `r = ${r}`;
			hinh = 'Tròn';
			break;
		case 'hinh-vuong':
			if (a < 0) {
				kq = 'Không thề tính';
			} else {
				kq = a * 4;
			}
			thongSo = `a = ${a}`;
			hinh = 'Vuông';
			break;
		case 'hinh-tam-giac':
			if (a < 0 || b < 0 || c < 0) {
				ketqua = 'Không thể tính';
			} else {
				ketqua = Number(a) + Number(b) + Number(c);
			}
			thongSo = `a = ${a}, b = ${b}, c= ${c}`;
			hinh = 'Tam giác';
			break;
		default:
			kq = 'Không thể tính';
			break;
	}
	res.json({ ketQua: kq, thongSo: thongSo, loaiHinh: hinh });
});

module.exports = router;
