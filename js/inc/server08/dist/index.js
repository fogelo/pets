"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3003;
app.get("/", (req, res) => {
    res.send("hello world");
    debugger;
});
app.post("/posts", (req, res) => {
    res.send("post was created");
});
app.listen(port, () => {
    console.log(`Server is running on ${port} port`);
});
