"use strict";
const express = require("express");
const app = express();
const port = 3001;
app.get("/", (req, res) => {
    res.send("Hello World!22233sdf3asdf");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
