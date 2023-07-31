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
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
};
