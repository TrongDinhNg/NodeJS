import "dotenv/config";
import jwt from "jsonwebtoken";

const KeyService = require("./KeyService");
const JWEService = require("./JWEService");

const CreateJWT = async (payload) => {
    let key = process.env.JWT_SECRET;
    const key1 = KeyService.loadKey();

    payload = JSON.stringify(payload);
    //mã hóa payload bằng JWE
    const encryptedToken = await JWEService.jweEncrypt(payload, key1.public);
    console.log("encryptedToken", encryptedToken);
    let token = jwt.sign(encryptedToken, key);
    console.log("token", token);
    return token;
};

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;

    try {
        decoded = jwt.verify(token, key);
    } catch (error) {
        console.log("err verifyToken: ", error);
    }
    return decoded;
};

const checkUserLoginJWT = (req, res, next) => {
    let cookies = req.cookies;
    if (cookies && cookies.JWT) {
        let token = cookies.JWT;
        let decoded = verifyToken(token);
        if (decoded) {
            console.log("decoded: ", decoded);
            next();
        } else {
            return res.status(401).json({
                errCode: -1,
                errMessage: "Unauthenticated user",
                data: "",
            });
        }
        //console.log("my cookies", cookies);
    } else {
        return res.status(401).json({
            errCode: -1,
            errMessage: "Unauthenticated user",
            data: "",
        });
    }
};

const checkAdminJWT = (req, res, next) => {
    let cookies = req.cookies;
    const key1 = KeyService.loadKey();

    if (cookies && cookies.JWT) {
        let token = cookies.JWT;
        let decoded = verifyToken(token);
        console.log("decoded: ", decoded);

        if (decoded) {
            let decryptDecoded = JWEService.jweDecrypt(decoded, key1.private);
            console.log("decryptDecoded", decryptDecoded);

            if (decryptDecoded.roleId === "R1") {
                console.log("Admin!!!");
                next();
            } else {
                console.log("err checkAdminJWT ");
                return res.status(403).json({
                    errCode: -1,
                    errMessage: "Unauthenticated user",
                    data: "",
                });
            }
        } else {
            console.log("err checkAdminJWT ");
            return res.status(403).json({
                errCode: -1,
                errMessage: "Unauthenticated user",
                data: "",
            });
        }
    } else {
        return res.status(403).json({
            errCode: -1,
            errMessage: "Unauthenticated user",
            data: "",
        });
    }
};
module.exports = {
    CreateJWT,
    verifyToken,
    checkUserLoginJWT,
    checkAdminJWT,
};
