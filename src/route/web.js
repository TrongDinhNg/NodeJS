import { Router } from "express";
//import { getHomePage, getCRUD, postCRUD } from "../controllers/homeController";
import HomeController from "../controllers/homeController.js";

let router = Router();

let initWebRoutes = (app) => {
    router.get('/', HomeController.getHomePage)
    router.get('/crud', HomeController.getCRUD)
    router.post('/post-crud', HomeController.postCRUD)
    router.get('/display-crud', HomeController.displayCRUD)
    return app.use('/', router)
}

module.exports = initWebRoutes