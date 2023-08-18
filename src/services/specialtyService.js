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

let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();
            if (data && data.length > 0) {
                data.map(
                    (item) =>
                        (item.image = new Buffer(item.image, "base64").toString(
                            "binary",
                        )),
                );
            }
            resolve({
                errCode: 0,
                errMessage: "Ok",
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = { createSpecialty, getAllSpecialty };