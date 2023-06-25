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
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,

}