import { Router } from "express";
import { offices } from "./offices";
import { employees } from "./employees";
import { customer } from "./customer";
import { orders } from "./orders";
import { product } from "./product";

const routes = Router();

routes.use("/offices", offices);
routes.use("/employees", employees);
routes.use("/customer", customer);
routes.use("/orders", orders);
routes.use("/product", product);

export { routes };
