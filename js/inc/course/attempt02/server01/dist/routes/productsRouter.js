"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = exports.productsRouter = void 0;
const express_1 = require("express");
exports.productsRouter = (0, express_1.Router)({});
exports.products = [
    { id: 1, value: "milk" },
    { id: 2, value: "orange" },
];
exports.productsRouter.get("/", (req, res) => {
    var _a;
    const searchString = (_a = req.query.value) === null || _a === void 0 ? void 0 : _a.toString();
    if (searchString) {
        res.send(exports.products.filter((product) => product.value.includes(searchString)));
    }
    else {
        res.send(exports.products);
    }
});
exports.productsRouter.post("/", (req, res) => {
    const newProduct = {
        id: new Date().getTime(),
        value: req.body.value,
    };
    exports.products.push(newProduct);
    res.sendStatus(201);
});
exports.productsRouter.put("/:id", (req, res) => {
    const existingProductIndex = exports.products.findIndex((product) => product.id === +req.params.id);
    if (existingProductIndex === -1)
        res.send(404);
    exports.products[existingProductIndex] = Object.assign(Object.assign({}, exports.products[existingProductIndex]), { value: req.body.value });
    res.send(200);
});
exports.productsRouter.get("/:id", (req, res) => {
    const id = +req.params.id;
    const product = exports.products.find((product) => product.id === id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
exports.productsRouter.delete("/:id", (req, res) => {
    const id = +req.params.id;
    const index = exports.products.findIndex((product) => product.id === id);
    if (index === -1)
        res.send(404);
    exports.products.splice(index, 1);
    res.send(204);
});
