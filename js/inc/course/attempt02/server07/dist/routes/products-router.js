"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const products_repository_1 = require("../repositories/products-repository");
const express_validator_1 = require("express-validator");
exports.productsRouter = (0, express_1.Router)({});
exports.productsRouter.get("/", (req, res) => {
    var _a;
    const titleSearchString = (_a = req.query.value) === null || _a === void 0 ? void 0 : _a.toString();
    const products = products_repository_1.productsRepository.findProducts(titleSearchString);
    res.send(products);
});
exports.productsRouter.post("/", (0, express_validator_1.body)("value").notEmpty(), (req, res) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (result.isEmpty()) {
        products_repository_1.productsRepository.createProduct(req.body.value);
        res.sendStatus(201);
    }
    else {
        res.send({ errors: result.array() });
    }
});
exports.productsRouter.put("/:id", (req, res) => {
    products_repository_1.productsRepository.createProduct(req.body.value);
    res.send(200);
});
exports.productsRouter.get("/:id", (req, res) => {
    const id = +req.params.id;
    const product = products_repository_1.productsRepository.findProductById(id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
exports.productsRouter.delete("/:id", (req, res) => {
    const id = +req.params.id;
    const status = products_repository_1.productsRepository.deleteProduct(id);
    if (status) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
