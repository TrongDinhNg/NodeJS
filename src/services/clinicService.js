import db from "../models/index.js";

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.name ||
                !data.address ||
                !data.imageBase64 ||
                !data.contentHTML ||
                !data.contentMarkdown
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameterrrr",
                });
            } else {
                await db.Clinic.create({
                    name: data.name,
                    image: data.imageBase64,
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    address: data.address,
                });
                resolve({
                    errCode: 0,
                    errMessage: "OK",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createClinic: createClinic,
};
