import initalizeApp from "./src/cron-jobs/initalizeApp.js"
import routes from "./src/routes/appRoutes.js";

initalizeApp();

export const viteNodeApp = routes();
