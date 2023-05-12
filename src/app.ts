import express from "express";
import { CONFIGS } from "./config";

const app = express();

const start = () => {
  app.listen(Number(CONFIGS.port), () => {
    console.log("app running");
  });
};

void start();
