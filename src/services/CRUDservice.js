import bcrypt from 'bcrypt'
import db from '../models/index'

const saltRounds = 10;

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hassPasswordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hassPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,

            })
            resolve('Create a new user succeed!')
        } catch (error) {
            reject(error)
        }
    })

}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hassPassword = await bcrypt.hash(password, saltRounds);
            return resolve(hassPassword)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    hashUserPassword: hashUserPassword,

}