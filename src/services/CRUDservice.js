import bcrypt from "bcrypt";
import db from "../models/index";
import { resolveInclude } from "ejs";

const saltRounds = 10;

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hassPasswordFromBcrypt = await hashUserPassword(data.password);
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
            resolve("Create a new user succeed!");
        } catch (error) {
            reject(error);
        }
    });
};

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

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users);
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
let getUpdateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let user = await db.User.findOne({
            //     where: { id: data.id }
            // })
            // if (user) {
            //     user.firstName = data.firstName
            //     user.lastName = data.lastName
            //     user.address = data.address
            //     await user.save()
            //     resolve()
            // }
            await db.User.update(
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                },
                {
                    where: { id: data.id },
                },
            );
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

let deleteUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id) {
                await db.User.destroy({
                    where: {
                        id: id,
                    },
                });
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createNewUser: createNewUser,
    hashUserPassword: hashUserPassword,
    getAllUsers: getAllUsers,
    getUserInforById: getUserInforById,
    getUpdateUserData: getUpdateUserData,
    deleteUserById: deleteUserById,
};
