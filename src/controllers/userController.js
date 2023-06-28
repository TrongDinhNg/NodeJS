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

module.exports = {
    handleLogin: handleLogin,
};
