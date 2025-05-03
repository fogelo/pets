import express, { Router } from "express";
import { BindingType, db } from "../../db/db";
import { ViewBindingModel } from "./models/ViewBindingModel";

export const bindingsRouter: Router = express.Router();

export const mapBindingToViewModel = (
  binding: BindingType
): ViewBindingModel => {
  return {
    userId: binding.userId,
    courseId: binding.courseId,
    date: binding.date,
  };
};

bindingsRouter.post("", (req, res) => {
  const newBinding: BindingType = {
    id: +new Date(),
    userId: req.body.userId,
    courseId: req.body.courseId,
    date: new Date(req.body.date),
  };

  db.userCourseBindings.push(newBinding);
  res.status(201).json(mapBindingToViewModel(newBinding));
  return;
});
