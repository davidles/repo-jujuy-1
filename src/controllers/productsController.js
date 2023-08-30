const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '..', 'data', 'productsDataBase.json');

// LEER
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


/**
 * SO: mac  o linux ---> /data/productsDataBase.json
 * SO: windows ---> \data\productsDataBase.json
 * 
 * path join(__dirname, '..', 'data', 'productsDataBase.json')
 * 
 * 
 * 
 */


const products = require('../data/productsDataBase.json');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products

	index: (req, res) => {
		
		const products = require('../data/productsDataBase.json');

		// Do the magic
		res.render('products',{productsList: products});

	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		//Params
		const { id } = req.params

		// Buscar el producto 
		const findProduct = products.find((prod) => prod.id === id );

		// Vista
		res.render('detail', { product : findProduct});

	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	  
		const newProduct = {
			id: `${Date.now()}`,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: req.file?.filename || "default-image.png"
		}

		products.push(newProduct);

		/**
		 * JSON: 
		 * 	Metodos: 
		 * 	  stringify: de  JS a JSON
		 * 	  parse: JSON a JS
		 * JS
		 * 
		 */

		//                    path              contenido
		fs.writeFileSync(productsFilePath, JSON.stringify(products) )

		res.redirect('/products');
	},

	/********************* */

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic

		// Id params
		const { id } = req.params;

		// Buscar el product
		const productFind = products.find((product) => product.id === id )

		// Vista
		res.render('product-edit-form', { productToEdit: productFind })
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic

		// [ 0 , 1,  2  ]

		const { id } = req.params;

		// Buscar Producto

		const productFind = products.find((product) => product.id === id );

		// Buscar indice del producto en el array

		const indexProduct = products.indexOf(productFind)

		// const index = products.findIndex((product) => product.id === id)

		// console.log(index)

		products[indexProduct] = {
			id: productFind.id,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: productFind.image
		}

		fs.writeFileSync(productsFilePath, JSON.stringify(products))

		res.redirect('/products')


	},

	/********************* */


	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		const newProd = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	
		const { id } = req.params;

		const newList = products.filter((prod) => prod.id !== id);

		fs.writeFileSync(productsFilePath, JSON.stringify(newList));

		// Do the magic
		res.render('products',{productsList: newProd});
	}
};

module.exports = controller;