import { Router } from "express";
import { getHomePage } from "../controllers/homeController";
// import HomeController from "../controllers/homeController.js";

let router = Router();

let initWebRoutes = (app) => {
    router.get('/', getHomePage)
    return app.use('/', router)
}

module.exports = initWebRoutes