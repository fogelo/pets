import { Router } from "express";
import { productsRepository } from "../repositories/products-repository";

export const productsRouter = Router({});

productsRouter.get("/", (req, res) => {
  const titleSearchString = req.query.value?.toString();
  const products = productsRepository.findProducts(titleSearchString);
  res.send(products);
});

productsRouter.post("/", (req, res) => {
  productsRepository.createProduct(req.body.value);
  res.sendStatus(201);
});

productsRouter.put("/:id", (req, res) => {
  productsRepository.createProduct(req.body.value);
  res.send(200);
});

productsRouter.get("/:id", (req, res) => {
  const id = +req.params.id;
  const product = productsRepository.findProductById(id);
  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});

productsRouter.delete("/:id", (req, res) => {
  const id = +req.params.id;
  const status = productsRepository.deleteProduct(id);
  if (status) {
    res.send(204);
  } else {
    res.send(404);
  }
});
