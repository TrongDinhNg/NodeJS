import db from "../models/index.js";
import bcrypt from "bcrypt";

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ["email", "firstName", "password"],
                    where: { email: email },
                    raw: true,
                });

                if (!user) {
                    resolve(false); // Mật khẩu không khớp
                } else {
                    let isPasswordMatch = await bcrypt.compare(
                        password,
                        user.password,
                    );
                    if (isPasswordMatch) {
                        userData.errCode = 0;
                        userData.errMessage = "Good Job!!!!!";
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 1;
                        userData.errMessage = "Wrong Password, try again!";
                    }
                }
            } else {
                userData.errCode = 1;
                userData.errMessage =
                    "Your's email isn't not exist in your system. Plz try other email";
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
};

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = "";
            if (userId === "ALL") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ["password"],
                    },
                });
            }
            if (userId && userId !== "ALL") {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ["password"],
                    },
                });
            }
            console.log(users);
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
};
