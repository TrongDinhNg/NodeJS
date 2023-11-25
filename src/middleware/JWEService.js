const { JWE, JWK } = require("node-jose");

const convertToKey = (key) => {
    return JWK.asKey(key, "json");
};

const jweEncrypt = async (input, key) => {
    const asKey = await convertToKey(key);
    return JWE.createEncrypt({ format: "compact" }, asKey)
        .update(input)
        .final();
};

const jweDecrypt = async (input, key) => {
    const asKey = await convertToKey(key);
    const decrypted = await JWE.createDecrypt(asKey).decrypt(input);

    // Convert the decrypted plaintext from Buffer to string
    decrypted.payload = decrypted.payload.toString();
    decrypted.plaintext = decrypted.plaintext.toString();

    return decrypted;
};

module.exports = {
    jweEncrypt,
    jweDecrypt,
};
