import Express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes.js";
import { handleError } from "./middleware.js";
dotenv.config();

const app = Express();

app.use(json());
app.use(cors());
app.use(routes);
app.use(handleError);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server Online");
});
