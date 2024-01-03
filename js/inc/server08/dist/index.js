"use strict";
const express = require("express");
const app = express();
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
