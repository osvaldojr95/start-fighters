import { Router } from "express";
import { postBattle, getRanking } from "./controllers.js";
import { battleValid } from "./middleware.js";

const routes = Router();

routes.post("/battle", battleValid, postBattle);
routes.get("/ranking", getRanking);

export default routes;
