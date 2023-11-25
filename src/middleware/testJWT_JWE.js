const jose = require("node-jose");
const jwt = require("jsonwebtoken");

let payload = {
    name: "Jone",
    role: "admin",
};

let keystore = jose.JWK.createKeyStore();

async function encrypt(key, payload) {
    let result = await jose.JWE.createEncrypt({ format: "flattened" }, key)
        .update(JSON.stringify(payload))
        .final();
    return result;
}

async function decrypt(key, encrypted) {
    let result = await jose.JWE.createDecrypt(key).decrypt(encrypted);
    console.log("result ", result);
    return result.plaintext.toString();
}

keystore.generate("oct", 256).then(async (key) => {
    // Mã hóa payload
    let encryptedPayload = await encrypt(key, payload);

    // Tạo JWT với payload đã mã hóa
    let token = jwt.sign({ data: encryptedPayload }, "your-secret-key");

    console.log("JWT:", token);

    // Xác minh JWT
    let decodedToken = jwt.verify(token, "your-secret-key");

    // Giải mã payload
    let decryptedPayload = await decrypt(key, decodedToken.data);

    console.log("Decrypted Payload:", decryptedPayload);
});
