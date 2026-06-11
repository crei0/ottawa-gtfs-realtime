import * as dotenv from "dotenv";
import routes from "./appRoutes";

dotenv.config();

const app = routes();

export const viteNodeApp = app;
