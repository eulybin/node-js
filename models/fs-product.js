// const fs = require('fs/promises');
// const path = require('path');
// const rootDir = require('../utils/path');

// const p = path.join(rootDir, 'data', 'products.json');

// const getProductsFromFile = async () => {
//     try {
//         const products = await fs.readFile(p, 'utf-8');
//         return JSON.parse(products);
//     } catch (err) {
//         console.error('ERROR from get products helper function', err);
//         return [];
//     }
// };

// // Product Class
// module.exports = class Product {
//     constructor(id, title, imageUrl, description, price) {
//         this.id = id;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.price = price;
//     }

//     async save() {
//         try {
//             const products = await getProductsFromFile();
//             products.push(this);
//             await fs.writeFile(p, JSON.stringify(products, null, 2));
//         } catch (err) {
//             console.error('ERROR from the save method on Product object', err);
//         }
//     }

//     async update() {
//         try {
//             const products = await getProductsFromFile();
//             const productIndex = products.findIndex((p) => p.id === this.id);

//             if (productIndex >= 0) {
//                 products[productIndex] = this;
//                 await fs.writeFile(p, JSON.stringify(products, null, 2));
//             }
//         } catch (err) {
//             console.error('ERROR from the update method on product class', err);
//         }
//     }

//     static async deleteById(id) {
//         try {
//             const products = await getProductsFromFile();
//             const updatedProducts = products.filter((p) => p.id !== id);
//             await fs.writeFile(p, JSON.stringify(updatedProducts, null, 2));
//         } catch (err) {
//             console.error('ERROR from delete method in Product model', err);
//         }
//     }

//     static async fetchAll() {
//         const products = await getProductsFromFile();
//         return products;
//     }

//     static async fetchProductById(id) {
//         const products = await getProductsFromFile();
//         const targetProduct = products.find((p) => p.id === id);
//         return targetProduct;
//     }

// ----- RAW SQL QUERIES -----

// static fetchAll() {
//         return db.execute('SELECT * FROM products');
//     }

//     static fetchProductById(id) {
//         return db.execute('SELECT * FROM products WHERE id = ?', [id]);
//     }
// };
// };
