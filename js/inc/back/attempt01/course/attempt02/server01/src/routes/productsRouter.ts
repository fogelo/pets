import { Router } from "express";

export const productsRouter = Router({});

export let products = [
  { id: 1, value: "milk" },
  { id: 2, value: "orange" },
];

productsRouter.get("/", (req, res) => {
  const searchString = req.query.value?.toString();
  if (searchString) {
    res.send(
      products.filter((product) => product.value.includes(searchString))
    );
  } else {
    res.send(products);
  }
});
productsRouter.post("/", (req, res) => {
  const newProduct = {
    id: new Date().getTime(),
    value: req.body.value,
  };
  products.push(newProduct);
  res.sendStatus(201);
});
productsRouter.put("/:id", (req, res) => {
  const existingProductIndex = products.findIndex(
    (product) => product.id === +req.params.id
  );
  if (existingProductIndex === -1) res.send(404);
  products[existingProductIndex] = {
    ...products[existingProductIndex],
    value: req.body.value,
  };
  res.send(200);
});
productsRouter.get("/:id", (req, res) => {
  const id = +req.params.id;
  const product = products.find((product) => product.id === id);
  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});
productsRouter.delete("/:id", (req, res) => {
  const id = +req.params.id;

  const index = products.findIndex((product) => product.id === id);
  if (index === -1) res.send(404);
  products.splice(index, 1);
  res.send(204);
});
