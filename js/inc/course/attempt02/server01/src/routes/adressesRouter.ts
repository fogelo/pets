import { Router } from "express";

export const adressesRouter = Router({});

export let adresses = [
  { id: 1, value: "Moscow" },
  { id: 2, value: "hsd" },
];

adressesRouter.get("/", (req, res) => {
  const searchString = req.query.value?.toString();
  if (searchString) {
    res.send(adresses.filter((adress) => adress.value.includes(searchString)));
  } else {
    res.send(adresses);
  }
});

adressesRouter.get("/:id", (req, res) => {
  const id = +req.params.id;
  const adress = adresses.find((adress) => adress.id === id);
  if (adress) {
    res.send(adress);
  } else {
    res.send(404);
  }
});
