import db from '../models/index.js'
import CRUDservice from '../services/CRUDservice.js'

let getHomePage = async (req, res) => {
    try {

        let data = await db.User.findAll()
        return res.render('homePage.ejs', {
            data: JSON.stringify(data),

        })
    } catch (error) {
        console.log(error)
    }
}
let getCRUD = async (req, res) => {
    try {

        let data = await db.User.findAll()
        return res.render('crud.ejs', {
            data: JSON.stringify(data),

        })
    } catch (error) {
        console.log(error)
    }
}
let postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body)
    console.log(message)
    return res.send('succeed')
}
let displayCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUsers()
    return res.render('displayCRUD.ejs', {
        data: data,

    })
}

let editCRUD = async (req, res) => {
    let userID = req.query.id
    if (userID) {
        let userData = await CRUDservice.getUserInforById(userID)

        res.render('editCRUD.ejs', {
            data: userData
        })
    }
    else {
        res.send('User not Found')
    }
}

let putCRUD = async (req, res) => {
    let data = req.body
    await CRUDservice.getUpdateUserData(data)
    return res.send('update done!')
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDservice.deleteUserById(id)
        return res.send('delete done!')

    }
    else {
        return res.send('User Not Found!')


    }

}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,

}