import express, { type Express } from "express";
import langController from "./services/langController.js";

const router: Express = express();
const port = 3000;

router.use("/languages", langController);

router.listen(port, () => {
  console.log(`Successfully listening to port: ${port}`);
});
