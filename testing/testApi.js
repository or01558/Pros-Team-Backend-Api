import fetch from "node-fetch";
import sha256 from "sha256";
import NodeRSA from 'node-rsa';
import crypto from "crypto";

const encryptedData = encryptRequestData({ id: "1" });
const requestData = encrypt(encryptedData);

fetch("http://localhost:5000/resources/forum/posts/manage", {
    method: "POST", headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json", "pros-team-api-key": getApiKey(), "authorization": "Bearer 111"
    }, body: JSON.stringify({ requestData })
}).then((r) => {
    r.json().then(json => console.log(json))
}).catch(err => {
    console.log(err);

});

function getApiKey() {
    return sha256("32&3Ds64Da1%&@657732u$$hn)^@)#*$@4l0540Xn", { asBytes: true });
}

function encryptRequestData(data) {
    const publicKey = new NodeRSA("MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKR4FyhSENqceTxMI6e57b5SAAgxE+5pV2GFQv1QMUC1n25NryZGNybme4vrTX8ajTs44qJAF85tYgw5yPicNNUCAwEAAQ==", "public");
    return publicKey.encrypt(data, "base64");
};

function encrypt(data) {
    const iv = Buffer.from([
        137, 69, 171, 8, 102, 75,
        142, 106, 211, 142, 113, 48,
        239, 56, 38, 26
    ]);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(getApiKey()), iv);
    let encryptedData = cipher.update(data, "utf8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData;
};