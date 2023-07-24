import { Router } from "express";
//import { getHomePage, getCRUD, postCRUD } from "../controllers/homeController";
import HomeController from "../controllers/homeController.js";
import UserController from "../controllers/userController.js";

let router = Router();

let initWebRoutes = (app) => {
    router.get("/", HomeController.getHomePage);
    router.get("/crud", HomeController.getCRUD);
    router.post("/post-crud", HomeController.postCRUD);
    router.get("/display-crud", HomeController.displayCRUD);
    router.get("/edit-crud", HomeController.editCRUD);
    router.post("/put-crud", HomeController.putCRUD);
    router.get("/delete-crud", HomeController.deleteCRUD);

    router.post("/api/login", UserController.handleLogin);
    router.get("/api/get-all-users", UserController.handleGetAllUsers);

    router.post("/api/create-new-user", UserController.handleCreateNewUser);
    router.put("/api/edit-user", UserController.handleEditUser);
    router.delete("/api/delete-user", UserController.handleDeleteUser);

    router.get("/api/allcode", UserController.getAllcode);

    return app.use("/", router);
};

module.exports = initWebRoutes;
