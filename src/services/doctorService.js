import db from "../models/index.js";
import "dotenv/config";
import _ from "lodash";

let MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limit,
                order: [["createdAt", "DESC"]],
                where: { roleId: "R2" },
                attributes: {
                    exclude: ["password"],
                },
                include: [
                    {
                        model: db.Allcode,
                        as: "positionData",
                        attributes: ["valueEn", "valueVi"],
                    },
                    {
                        model: db.Allcode,
                        as: "genderData",
                        attributes: ["valueEn", "valueVi"],
                    },
                ],
                raw: true,
                nest: true,
            });
            resolve({
                errCode: 0,
                data: users,
            });
        } catch (e) {
            console.log("err:", e);
        }
    });
};
let getAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: "R2" },
                attributes: {
                    exclude: ["password", "image"],
                },
                raw: true,
            });
            resolve({
                errCode: 0,
                data: doctors,
            });
        } catch (e) {
            reject(e);
        }
    });
};
let saveInforDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.doctorId ||
                !data.contentHTML ||
                !data.contentMarkdown ||
                !data.action
            ) {
                console.log("data", data);
                resolve({
                    errCode: 1,
                    errMessage: "Err from Server",
                });
            } else {
                if (data.action === "CREATE") {
                    await db.Markdown.create({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                        doctorId: data.doctorId,
                    });
                    resolve({
                        errCode: 0,
                        errMessage: "Save Infor Doctor Success!!!",
                    });
                } else if (data.action === "EDIT") {
                    let md = await db.Markdown.findOne({
                        where: { doctorId: data.doctorId },
                        raw: false,
                    });
                    if (md) {
                        md.contentHTML = data.contentHTML;
                        md.contentMarkdown = data.contentMarkdown;
                        md.description = data.description;
                        md.doctorId = data.doctorId;
                        md.updatedAt = new Date();
                        await md.save();

                        resolve({
                            errCode: 0,
                            errMessage: "Update Infor Doctor Success!!!",
                        });
                    } else {
                        resolve({
                            errCode: 2,
                            errMessage: "Markdown not found!!!",
                        });
                    }
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getInforDoctorById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter! ",
                });
            } else {
                let data = await db.User.findOne({
                    where: { id: id },
                    attributes: {
                        exclude: ["password"],
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: [
                                "description",
                                "contentHTML",
                                "contentMarkdown",
                            ],
                        },
                        {
                            model: db.Allcode,
                            as: "positionData",
                            attributes: ["valueEn", "valueVi"],
                        },
                    ],
                    raw: false,
                    nest: true,
                });
                if (data && data.image) {
                    data.image = new Buffer(data.image, "base64").toString(
                        "binary",
                    );
                }
                if (!data) {
                    data = {};
                }
                resolve({
                    errCode: 0,
                    data: data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getMarkdownByDoctorId = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter! ",
                });
            } else {
                let markdown = await db.Markdown.findOne({
                    where: { doctorId: id },
                    raw: true,
                });
                if (markdown && markdown.data !== 0) {
                    resolve({
                        errCode: 0,
                        data: markdown,
                    });
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: "markdown not found",
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};
let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters!",
                });
            } else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map((i) => {
                        i.maxNumber = MAX_NUMBER_SCHEDULE;
                        return i;
                    });
                }
                //get all existed schedule
                let existing = await db.Schedule.findAll({
                    where: { doctorId: data.doctorId, date: data.fomatedDate },
                    attributes: ["timeType", "date", "doctorId", "maxNumber"],
                    raw: true,
                });
                //convert date
                if (existing && existing.length > 0) {
                    existing = existing.map((i) => {
                        i.date = new Date(i.date).getTime();
                        return i;
                    });
                }

                //compare existed schedule with new schedule
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && +a.date === +b.date;
                });

                //Create data
                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                }

                resolve({
                    errCode: 0,
                    errMessage: "Create schedule success!",
                });
            }
        } catch (error) {
            console.log("error", error);
            reject(error);
        }
    });
};
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    saveInforDoctor: saveInforDoctor,
    getInforDoctorById: getInforDoctorById,
    getMarkdownByDoctorId: getMarkdownByDoctorId,
    bulkCreateSchedule: bulkCreateSchedule,
};
