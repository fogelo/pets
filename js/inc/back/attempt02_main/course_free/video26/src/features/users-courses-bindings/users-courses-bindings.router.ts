import express, { Router } from "express";
import { dbInMemory } from "../../db/db-in-memory";
import { ViewBindingModel } from "./models/ViewBindingModel";
import { DbBindingModel } from "./models/DbBindingModel";

export const bindingsRouter: Router = express.Router();

export const mapDbBindingToViewBindingModel = (
  binding: DbBindingModel
): ViewBindingModel => {
  return {
    userId: binding.userId,
    courseId: binding.courseId,
    date: binding.date,
  };
};

bindingsRouter.post("", (req, res) => {
  const newBinding: DbBindingModel = {
    id: +new Date(),
    userId: req.body.userId,
    courseId: req.body.courseId,
    date: new Date(req.body.date),
  };

  dbInMemory.bindings.push(newBinding);
  res.status(201).json(mapDbBindingToViewBindingModel(newBinding));
  return;
});
