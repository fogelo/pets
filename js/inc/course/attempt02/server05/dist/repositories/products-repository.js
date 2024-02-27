"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRepository = exports.products = void 0;
exports.products = [
    { id: 1, value: "milk" },
    { id: 2, value: "orange" },
];
exports.productsRepository = {
    findProducts(title) {
        if (title) {
            return exports.products.filter((product) => product.value.includes(title));
        }
        else {
            return exports.products;
        }
    },
    findProductById(id) {
        const product = exports.products.find((product) => product.id === id);
        return product;
    },
    createProduct(value) {
        const newProduct = {
            id: new Date().getTime(),
            value,
        };
        exports.products.push(newProduct);
    },
    updateProduct(id, value) {
        const existingProductIndex = exports.products.findIndex((product) => product.id === id);
        if (existingProductIndex === -1)
            return false;
        exports.products[existingProductIndex] = Object.assign(Object.assign({}, exports.products[existingProductIndex]), { value });
    },
    deleteProduct(id) {
        const index = exports.products.findIndex((product) => product.id === id);
        if (index === -1)
            return false;
        exports.products.splice(index, 1);
        return true;
    },
};
