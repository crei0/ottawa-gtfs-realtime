import * as dotenv from "dotenv";
import routes from "./routes/appRoutes";

dotenv.config();

const app = routes();

export const viteNodeApp = app;
