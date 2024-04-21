import { Router } from "express";
import { persons } from "./persons";

const routes = Router();

routes.use("/pessoas", persons);

export { routes };
