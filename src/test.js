const path = require('node:path');
const fs = require('node:fs')

const productsFilePath = path.join(__dirname, './data/productsDataBase.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const products = require('./data/productsDataBase.json');

console.log(products);