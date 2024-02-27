"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const products_router_1 = require("./routes/products-router");
const adresses_router_1 = require("./routes/adresses-router");
exports.app = (0, express_1.default)();
const port = 3001;
// middlewares
exports.app.use(express_1.default.json());
// routers
exports.app.get("/", (req, res) => {
    res.send("Hello World!");
});
exports.app.use("/products", products_router_1.productsRouter);
exports.app.use("/adresses", adresses_router_1.adressesRouter);
// start
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
