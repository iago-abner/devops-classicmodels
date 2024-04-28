import express from "express";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.get("health-check", (_, res) => {
  res.send("OK");
});

app.use(routes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
