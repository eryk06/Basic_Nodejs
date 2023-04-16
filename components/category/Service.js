const categoryModel = require('./Model');

const getAllCategories = async () => {
	try {
		// select * from caterogies
		return await categoryModel.find();
	} catch (error) {
		console.log(error);
	}
};

module.exports = { getAllCategories };

var data = [
	{
		_id: 1,
		name: 'Lisle',
	},
	{
		_id: 2,
		name: 'Margot',
	},
	{
		_id: 3,
		name: 'Skell',
	},
	{
		_id: 4,
		name: 'Ranna',
	},
	{
		_id: 5,
		name: 'Daffie',
	},
	{
		_id: 6,
		name: 'Fae',
	},
	{
		_id: 7,
		name: 'Sal',
	},
	{
		_id: 8,
		name: 'Audrye',
	},
	{
		_id: 9,
		name: 'Barnabe',
	},
	{
		_id: 10,
		name: 'Andrea',
	},
];
