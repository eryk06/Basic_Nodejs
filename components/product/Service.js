const productModel = require('./Model');

// Lấy danh sách sản phẩm từ database
const getAllProducts = async () => {
  try {
    return await productModel.find();
  } catch (error) {
    console.log('Get all product error: ', error);
    throw error;
  }
};

// Xóa sản phẩm theo id
const deleteProductById = async (id) => {
  try {
    await productModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.log('Delete product error: ', error);
  }
  return false;
};

// Thêm mới sản phẩm
const addProduct = async (name, price, quantity, image, category) => {
  try {
    const newProduct = new productModel({
      name,
      price,
      quantity,
      image,
      category,
    });
    await newProduct.save();
    return true;
  } catch (error) {
    console.log('🚀 ~ Add product error:', error);
  }
  return false;
};

// Lấy sản phẩm theo id
const getProductById = async (id) => {
  try {
    return productModel.findById(id);
  } catch (error) {
    console.log('Get product by id error: ', error);
  }
  return null;
};

// update sản phẩm theo id
const updateProductById = async (
  id,
  name,
  price,
  quantity,
  image,
  category
) => {
  try {
    const item = await productModel.findById(id);
    if (item) {
      item.name = name ? name : item.name;
      item.price = price ? price : item.price;
      item.quantity = quantity ? quantity : item.quantity;
      item.image = image ? image : item.image;
      item.category = category ? category : item.category;
      await item.save();
      return true;
    }
  } catch (error) {
    console.log('Update product error: ', error);
  }
  return false;
};

// Tìm kiếm sản phẩm
const searchProduct = async (keyword) => {
  try {
    let query = {
      // gt: greater than, lt: less than
      // gte: greater than or equal, lte: less than or equal
      price: { $gt: 10, $lt: 100 },
      // $regex: regular expression
      // find all products that have name contains keyword
      name: { $regex: keyword, $options: 'i' },
      // tìm kiếm chính xác
      //name: keyword,
      //email: email,
      $or: [{ quantity: { $gte: 20 } }, { quantity: { $lte: 5 } }],
    };
    let products = await productModel.find(query);
    await productModel.find({ price: 10 }, 'name price');
    return products;
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
  updateProductById,
  searchProduct,
};

var data = [
  {
    _id: 1,
    name: 'Davis-Batz',
    price: 11,
    quantity: 93,
    image: 'https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg',
    category: 96,
  },
  {
    _id: 2,
    name: "Schowalter, O'Hara and Turner",
    price: 41,
    quantity: 22,
    image: 'https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg',
    category: 74,
  },
  {
    _id: 3,
    name: 'Ratke Inc',
    price: 7,
    quantity: 1,
    image: 'https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg',
    category: 11,
  },
  {
    _id: 4,
    name: 'Ullrich-Abshire',
    price: 99,
    quantity: 96,
    image: 'https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg',
    category: 37,
  },
  {
    _id: 5,
    name: 'Kerluke, Quigley and Block',
    price: 53,
    quantity: 50,
    image: 'https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg',
    category: 51,
  },
  {
    _id: 6,
    name: 'Fritsch LLC',
    price: 3,
    quantity: 54,
    image: 'https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg',
    category: 10,
  },
  {
    _id: 7,
    name: 'Lakin, Bailey and Roob',
    price: 18,
    quantity: 26,
    image: 'https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg',
    category: 26,
  },
  {
    _id: 8,
    name: 'Erdman, Koss and Trantow',
    price: 52,
    quantity: 6,
    image: 'https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg',
    category: 91,
  },
  {
    _id: 9,
    name: 'Dietrich-Pouros',
    price: 51,
    quantity: 86,
    image: 'https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg',
    category: 76,
  },
  {
    _id: 10,
    name: 'Rohan, Pacocha and Hackett',
    price: 67,
    quantity: 21,
    image: 'https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg',
    category: 80,
  },
  {
    _id: 11,
    name: 'Weber, Harris and Torp',
    price: 100,
    quantity: 47,
    image: 'https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg',
    category: 32,
  },
  {
    _id: 12,
    name: 'Leffler Group',
    price: 35,
    quantity: 59,
    image: 'https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg',
    category: 44,
  },
  {
    _id: 13,
    name: 'Gutkowski Inc',
    price: 42,
    quantity: 12,
    image: 'https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg',
    category: 1,
  },
  {
    _id: 14,
    name: 'Jacobs-Gusikowski',
    price: 64,
    quantity: 53,
    image: 'https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg',
    category: 80,
  },
  {
    _id: 15,
    name: 'Fadel-Bogan',
    price: 92,
    quantity: 50,
    image: 'https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg',
    category: 75,
  },
  {
    _id: 16,
    name: 'Heaney and Sons',
    price: 18,
    quantity: 37,
    image: 'https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg',
    category: 52,
  },
  {
    _id: 17,
    name: 'Predovic Group',
    price: 36,
    quantity: 54,
    image: 'https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg',
    category: 77,
  },
  {
    _id: 18,
    name: 'Okuneva-Leuschke',
    price: 41,
    quantity: 34,
    image: 'https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg',
    category: 37,
  },
  {
    _id: 19,
    name: 'Deckow-Mayert',
    price: 91,
    quantity: 74,
    image: 'https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg',
    category: 24,
  },
  {
    _id: 20,
    name: 'Stark, Parisian and Orn',
    price: 6,
    quantity: 78,
    image: 'https://cdn.tgdd.vn/2023/03/campaign/TOY7639-copy-1920x1080.jpg',
    category: 22,
  },
];
