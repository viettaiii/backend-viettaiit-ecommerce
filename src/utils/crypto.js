const CryptoJS = require("crypto-js");
const crypto = require("crypto");

const createString = () => {
  return crypto.randomBytes(60).toString();
};

const encrypt = (value) => {
  return CryptoJS.AES.encrypt(value, process.env.CRYPTO_SECRET).toString();
};

const decrypt = (value) => {
  var bytes = CryptoJS.AES.decrypt(value, process.env.CRYPTO_SECRET);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
module.exports = {
    createString,
  encrypt,
  decrypt,
};
