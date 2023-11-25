const { JWK } = require("node-jose");
const fs = require("fs");

const generateKeyPair = async () => {
    const jwk = await JWK.createKey("RSA", 2048);
    const key = {
        private: jwk.toJSON(true),
        public: jwk.toJSON(false),
    };
    saveKey(key);
    return key.public;
};

const saveKey = (key) => {
    fs.writeFileSync("./keyPair.json", JSON.stringify(key));
};

const loadKey = () => {
    return require("./keyPair.json");
};

module.exports = {
    generateKeyPair,
    loadKey,
};
