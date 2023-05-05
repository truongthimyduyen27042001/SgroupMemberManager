const crypto = require("crypto");

const hashingPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = crypto.pbkdf2Sync(password, salt , 1000, 64 , 'sha512').toString('hex');
  console.log('hashed: ', hashedPassword)
  return {
    salt,
    hashedPassword,
  };
};

const comparePassword = (hashedPassword, salt, password) => {
  const hashedRawPassword = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hashedRawPassword === hashedPassword;
};

module.exports = {
  hashingPassword,
  comparePassword,
};
