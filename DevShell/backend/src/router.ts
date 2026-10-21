import express, { type Express } from "express";
import langController from "./services/langController.js";
import cors from "cors";

const router: Express = express();

const port = 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  optionSuccessStatus: 200
};

router.use(cors(corsOptions));
router.use("/languages", langController);

router.listen(port, () => {
  console.log(`Successfully listening to port http://localhost:${port}`);
});
