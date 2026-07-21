import * as dotenv from "dotenv";

import routes from "./src/routes/appRoutes";

dotenv.config();

export const viteNodeApp = routes();
