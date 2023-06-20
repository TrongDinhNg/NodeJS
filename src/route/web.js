import { Router } from "express";
// import HomeController from "../controllers/homeController.js";

let router = Router();

let initWebRoutes = (app) => {
    router.get('/', (req, res) => {
        res.send('Heloo World!!!')
    })
    return app.use('/', router)
}

module.exports = initWebRoutes