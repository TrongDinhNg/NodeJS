(async () => {
    const KeyService = require("./KeyService");
    const JWEService = require("./JWEService");

    //const key1 = await KeyService.generateKeyPair();
    const key = KeyService.loadKey();
    const payload = JSON.stringify({
        name: "trong",
        role: "admin",
    });

    const encryptedToken = await JWEService.jweEncrypt(payload, key.public);
    const decryptedToken = await JWEService.jweDecrypt(
        encryptedToken,
        key.private,
    );

    console.log("encryptedToken: ", encryptedToken);
    console.log("decryptedToken: ", decryptedToken);
})();
