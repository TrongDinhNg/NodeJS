import db from "../models/index.js";

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.name ||
                !data.imageBase64 ||
                !data.contentHTML ||
                !data.contentMarkdown
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter!",
                });
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                });
                resolve({
                    errCode: 0,
                    errMessage: "Ok",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = { createSpecialty };
