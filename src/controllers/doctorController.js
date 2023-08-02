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

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    postInforDoctor: postInforDoctor,
    getInforDoctorById: getInforDoctorById,
};
