import userService from "../services/userService.js";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    //1_check email exist
    //2_compare password
    //3_access_token, JWT
    //----------1-----------//
    if (!email || !password) {
        return res.status(500).json({
            errorCode: 1,
            message: "Missing input parameters ",
        });
    }

    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errorCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
    });
};

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; //ALL, id
    // console.log(id);

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters",
            users: [],
        });
    }
    let user = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        user,
    });
};
let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters",
        });
    } else {
        let message = await userService.deleteUser(req.body.id);
        return res.status(200).json(message);
    }
};

let handleEditUser = async (req, res) => {
    let userID = req.body.id;
    console.log("userId: ", userID);
    if (userID) {
        let message = await userService.updateUserData(req.body);
        return res.status(200).json(message);
    } else {
        res.send("Missing input parameters");
    }
};

let getAllcode = async (req, res) => {
    try {
        let data = await userService.getAllcodeService(req.query.type);
        return res.status(200).json(data);
    } catch (error) {
        console.log("err getAllcode:", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error Message from Server",
        });
    }
};

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser,
    getAllcode: getAllcode,
};
