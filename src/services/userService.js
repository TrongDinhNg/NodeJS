import db from "../models/index.js";
import bcrypt from "bcrypt";

const saltRounds = 10;
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hash(password, saltRounds);
            return resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
};

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
            // console.log(users);
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email exist?
            let checkEmail = await checkUserEmail(data.email);
            if (checkEmail === true) {
                resolve({
                    errCode: 1,
                    message:
                        "Your email already in used, Plz try another email!",
                });
            } else {
                let hassPasswordFromBcrypt = await hashUserPassword(
                    data.password,
                );
                await db.User.create({
                    email: data.email,
                    password: hassPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender === "1" ? true : false,
                    roleId: data.roleId,
                });
                resolve({
                    errCode: 0,
                    message: "OK",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                resolve({
                    errCode: 2,
                    message: "User not found!",
                });
            } else {
                await db.User.destroy({
                    where: {
                        id: userId,
                    },
                });
                resolve({
                    errCode: 0,
                    message: "User deleted!",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let getUserInforById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            });
            if (user) {
                resolve(user);
            } else console.log("User not found");
        } catch (error) {
            reject(error);
        }
    });
};
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (user) {
                user.update(
                    {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                    },
                    {
                        where: { id: data.id },
                    },
                );
                resolve({
                    errCode: 0,
                    message: "Update User Success!",
                });
            } else {
                resolve({
                    errCode: 2,
                    message: "User not Found!",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    getUserInforById: getUserInforById,
    updateUserData: updateUserData,
};
