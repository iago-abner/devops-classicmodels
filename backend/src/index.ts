import express from "express";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.get("/", (_, res) => {
  res.send("OK");
});

app.use(routes);

app.listen(4242, () => {
  console.log("Server is running on port 4242");
});
