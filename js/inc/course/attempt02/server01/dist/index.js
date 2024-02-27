"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const productsRouter_1 = require("./routes/productsRouter");
const adressesRouter_1 = require("./routes/adressesRouter");
exports.app = (0, express_1.default)();
const port = 3001;
// middlewares
exports.app.use(express_1.default.json());
// routers
exports.app.get("/", (req, res) => {
    res.send("Hello World!");
});
exports.app.use("/products", productsRouter_1.productsRouter);
exports.app.use("/adresses", adressesRouter_1.adressesRouter);
// start
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
