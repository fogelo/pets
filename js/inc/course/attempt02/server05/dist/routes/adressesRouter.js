"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adresses = exports.adressesRouter = void 0;
const express_1 = require("express");
exports.adressesRouter = (0, express_1.Router)({});
exports.adresses = [
    { id: 1, value: "Moscow" },
    { id: 2, value: "hsd" },
];
exports.adressesRouter.get("/", (req, res) => {
    var _a;
    const searchString = (_a = req.query.value) === null || _a === void 0 ? void 0 : _a.toString();
    if (searchString) {
        res.send(exports.adresses.filter((adress) => adress.value.includes(searchString)));
    }
    else {
        res.send(exports.adresses);
    }
});
exports.adressesRouter.get("/:id", (req, res) => {
    const id = +req.params.id;
    const adress = exports.adresses.find((adress) => adress.id === id);
    if (adress) {
        res.send(adress);
    }
    else {
        res.send(404);
    }
});
