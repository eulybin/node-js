const fs = require('fs/promises');
const path = require('path');
const rootDir = require('../util/path');

const p = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
    static async addToCart(product) {
        try {
            const cart = await fs.readFile(p, 'utf-8');
            const parsedCart = JSON.parse(cart);

            const itemIndex = parsedCart.items.findIndex((item) => item.id === product.id);

            if (itemIndex >= 0) {
                parsedCart.items[itemIndex].quantity += 1;
            } else {
                parsedCart.items.push({ ...product, quantity: 1 });
            }

            parsedCart.totalPrice += Number(product.price);
            await fs.writeFile(p, JSON.stringify(parsedCart, null, 2));
        } catch (err) {
            if (err.code === 'ENOENT') {
                const initialCart = {
                    items: [{ ...product, quantity: 1 }],
                    totalPrice: Number(product.price),
                };
                await fs.writeFile(p, JSON.stringify(initialCart, null, 2));
            } else {
                console.error('ERROR from the add to cart method', err);
            }
        }
    }

    static async removeFromCart(productId) {}
};
