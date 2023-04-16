var express = require('express');
var router = express.Router();

// http://localhost:3000/dien-tich/hinh-chu-nhat?&a=10&b=20
router.get('/:loai_Hinh', async function (req, res, next) {
	const { a, b, h, r } = req.query;
	const { loai_Hinh } = req.params;
	let kq = '';
	let thong_So = '';
	let hinh = '';
	switch (loai_Hinh) {
		case 'hinh-tron':
			if (r <= 0) {
				kq = 'Không thể tính';
			} else {
				kq = r * r * 3.14;
			}
			thong_So = `r = ${r}`;
			hinh = 'Tròn';
			break;
		case 'hinh-chu-nhat':
			if (a <= 0 || b <= 0) {
				kq = 'Không thể tính';
			} else {
				kq = a * b;
			}
			thong_So = `a = ${a}, b = ${b}`;
			hinh = 'Chử Nhật';
			break;
		case 'hinh-vuong':
			if (a <= 0) {
				kq = 'Không thể tính';
			} else {
				kq = a * a;
			}
			thong_So = `a = ${a}`;
			hinh = 'Vuông';
			break;
		case 'hinh-tam-giac':
			if (a <= 0 || h <= 0) {
				kq = 'Không thể tính';
			} else {
				kq = a * h;
			}
			thong_So = `a = ${a}, h = ${h}`;
			hinh = 'Tam giác';
			break;
		case 'hinh-binh-hanh':
			if (a <= 0 || h <= 0) {
				kq = 'Không thể tính';
			} else {
				kq = a * h;
			}
			thong_So = `a = ${a}, h = ${h}`;
			hinh = 'Hình Bình Hành';
			break;
		default:
			kq = 'Không thể tính';
			break;
	}

	res.render('acreage', { ketQua: kq, thongSo: thong_So, loaiHinh: hinh });
});

module.exports = router;
