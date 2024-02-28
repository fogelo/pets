import { Router } from "express";
import { productsRepository } from "../repositories/products-repository";
import { body, validationResult } from "express-validator";

export const productsRouter = Router({});

productsRouter.get("/", (req, res) => {
  const titleSearchString = req.query.value?.toString();
  const products = productsRepository.findProducts(titleSearchString);
  res.send(products);
});

productsRouter.post("/", body("value").notEmpty(), (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    productsRepository.createProduct(req.body.value);
    res.sendStatus(201);
  } else {
    res.send({ errors: result.array() });
  }
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
