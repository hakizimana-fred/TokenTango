import express from "express";
import "dotenv/config";

const app = express();
const { PORT } = process.env;

const start = async () => {
  try {
    app.get("/healthcheck", (_req, res) => res.send("welcome"));

    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  } catch (e) {}
};

void start().catch((e) => console.log(e.message));
