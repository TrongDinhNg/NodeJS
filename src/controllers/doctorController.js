import doctorService from "../services/doctorService";

let getTopDoctorHome = async (req, res) => {
    let limit = req.body.limit;
    if (!limit) {
        limit = 10;
    }
    try {
        let doctors = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json(doctors);
    } catch (e) {
        console.log("err", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Err from server...",
        });
    }
};
let getAllDoctor = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctor();
        return res.status(200).json(doctors);
    } catch (e) {
        console.log("e", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "ERR from Server",
        });
    }
};
let postInforDoctor = async (req, res) => {
    try {
        let response = await doctorService.saveInforDoctor(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log("e", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "ERR from Server",
        });
    }
};
let getInforDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getInforDoctorById(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        console.log("e", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "ERR from Server",
        });
    }
};
let getMarkdownByDoctorId = async (req, res) => {
    try {
        let infor = await doctorService.getMarkdownByDoctorId(
            req.query.doctorId,
        );
        return res.status(200).json(infor);
    } catch (e) {
        console.log("e", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "ERR from Server",
        });
    }
};
let bulkCreateSchedule = async (req, res) => {
    try {
        let infor = await doctorService.bulkCreateSchedule(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log("e", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "ERR from Server",
        });
    }
};
let getScheduleDoctorByDate = async (req, res) => {
    try {
        let infor = await doctorService.getScheduleDoctorByDate(
            req.query.doctorId,
            req.query.date,
        );
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        });
    }
};
let getExtraInforDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getExtraInforDoctorById(
            req.query.doctorId,
        );
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        });
    }
};
let getProfileDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getProfileDoctorById(
            req.query.doctorId,
        );
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        });
    }
};
let getListPatientForDoctor = async (req, res) => {
    try {
        let infor = await doctorService.getListPatientForDoctor(
            req.query.doctorId,
            req.query.date,
        );
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the server",
        });
    }
};
let sendConfirmedExamination = async (req, res) => {
    try {
        let infor = await doctorService.sendConfirmedExamination(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the server: sendConfirmedExamination",
        });
    }
};
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    postInforDoctor: postInforDoctor,
    getInforDoctorById: getInforDoctorById,
    getMarkdownByDoctorId: getMarkdownByDoctorId,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleDoctorByDate: getScheduleDoctorByDate,
    getExtraInforDoctorById: getExtraInforDoctorById,
    getProfileDoctorById: getProfileDoctorById,
    getListPatientForDoctor: getListPatientForDoctor,
    sendConfirmedExamination: sendConfirmedExamination,
};
