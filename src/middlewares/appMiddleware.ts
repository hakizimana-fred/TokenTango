import cors from "cors";
import { Application, json } from "express";

export default (app: Application) => {
  app.use(json());
  app.use(cors());
};
