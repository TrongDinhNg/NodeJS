import { Router } from "express";
//import { getHomePage, getCRUD, postCRUD } from "../controllers/homeController";
import HomeController from "../controllers/homeController.js";
import UserController from "../controllers/userController.js";
import DoctorController from "../controllers/doctorController.js";
import patientController from "../controllers/patientController.js";
import specialtyController from "../controllers/specialtyController.js";
import clinicController from "../controllers/clinicController.js";

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

    router.get("/api/top-doctor-home", DoctorController.getTopDoctorHome);
    router.get("/api/get-all-doctor", DoctorController.getAllDoctor);
    router.post("/api/save-infor-doctor", DoctorController.postInforDoctor);
    router.get(
        "/api/get-infor-doctor-by-id",
        DoctorController.getInforDoctorById,
    );
    router.get(
        "/api/get-markdown-by-doctor-id",
        DoctorController.getMarkdownByDoctorId,
    );
    router.post(
        "/api/bulk-create-schedule",
        DoctorController.bulkCreateSchedule,
    );
    router.get(
        "/api/get-schedule-doctor-by-date",
        DoctorController.getScheduleDoctorByDate,
    );
    router.get(
        "/api/get-extra-infor-doctor-by-id",
        DoctorController.getExtraInforDoctorById,
    );
    router.get(
        "/api/get-profile-doctor-by-id",
        DoctorController.getProfileDoctorById,
    );
    router.post(
        "/api/patient-book-appointment",
        patientController.postBookAppointment,
    );
    router.post(
        "/api/verify-book-appointment",
        patientController.postVerifyBookAppointment,
    );
    router.post(
        "/api/create-new-specialty",
        specialtyController.createSpecialty,
    );
    router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
    router.get(
        "/api/get-detail-specialty-by-id",
        specialtyController.getDetailSpecialtyById,
    );
    router.post("/api/create-new-clinic", clinicController.createClinic);
    router.get("/api/get-clinic", clinicController.getAllClinic);
    router.get(
        "/api/get-detail-clinic-by-id",
        clinicController.getDetailClinicById,
    );

    return app.use("/", router);
};

module.exports = initWebRoutes;
