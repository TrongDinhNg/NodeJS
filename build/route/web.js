"use strict";

var _express = require("express");
var _homeController = _interopRequireDefault(require("../controllers/homeController.js"));
var _userController = _interopRequireDefault(require("../controllers/userController.js"));
var _doctorController = _interopRequireDefault(require("../controllers/doctorController.js"));
var _patientController = _interopRequireDefault(require("../controllers/patientController.js"));
var _specialtyController = _interopRequireDefault(require("../controllers/specialtyController.js"));
var _clinicController = _interopRequireDefault(require("../controllers/clinicController.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//import { getHomePage, getCRUD, postCRUD } from "../controllers/homeController";

var router = (0, _express.Router)();
var initWebRoutes = function initWebRoutes(app) {
  router.get("/", _homeController["default"].getHomePage);
  router.get("/crud", _homeController["default"].getCRUD);
  router.post("/post-crud", _homeController["default"].postCRUD);
  router.get("/display-crud", _homeController["default"].displayCRUD);
  router.get("/edit-crud", _homeController["default"].editCRUD);
  router.post("/put-crud", _homeController["default"].putCRUD);
  router.get("/delete-crud", _homeController["default"].deleteCRUD);
  router.post("/api/login", _userController["default"].handleLogin);
  router.get("/api/get-all-users", _userController["default"].handleGetAllUsers);
  router.post("/api/create-new-user", _userController["default"].handleCreateNewUser);
  router.put("/api/edit-user", _userController["default"].handleEditUser);
  router["delete"]("/api/delete-user", _userController["default"].handleDeleteUser);
  router.get("/api/allcode", _userController["default"].getAllcode);
  router.get("/api/top-doctor-home", _doctorController["default"].getTopDoctorHome);
  router.get("/api/get-all-doctor", _doctorController["default"].getAllDoctor);
  router.post("/api/save-infor-doctor", _doctorController["default"].postInforDoctor);
  router.get("/api/get-infor-doctor-by-id", _doctorController["default"].getInforDoctorById);
  router.get("/api/get-markdown-by-doctor-id", _doctorController["default"].getMarkdownByDoctorId);
  router.post("/api/bulk-create-schedule", _doctorController["default"].bulkCreateSchedule);
  router.get("/api/get-schedule-doctor-by-date", _doctorController["default"].getScheduleDoctorByDate);
  router.get("/api/get-extra-infor-doctor-by-id", _doctorController["default"].getExtraInforDoctorById);
  router.get("/api/get-profile-doctor-by-id", _doctorController["default"].getProfileDoctorById);
  router.get("/api/get-list-patient-for-doctor", _doctorController["default"].getListPatientForDoctor);
  router.post("/api/patient-book-appointment", _patientController["default"].postBookAppointment);
  router.post("/api/verify-book-appointment", _patientController["default"].postVerifyBookAppointment);
  router.post("/api/create-new-specialty", _specialtyController["default"].createSpecialty);
  router.get("/api/get-all-specialty", _specialtyController["default"].getAllSpecialty);
  router.get("/api/get-detail-specialty-by-id", _specialtyController["default"].getDetailSpecialtyById);
  router.post("/api/create-new-clinic", _clinicController["default"].createClinic);
  router.get("/api/get-clinic", _clinicController["default"].getAllClinic);
  router.get("/api/get-detail-clinic-by-id", _clinicController["default"].getDetailClinicById);
  router.post("/api/send-examination-comfirmed", _doctorController["default"].sendConfirmedExamination);
  return app.use("/", router);
};
module.exports = initWebRoutes;