// const jsonwebtoken = require("jsonwebtoken");

// const SECRET = "sgroup-member";

// const user = {
//   name: "truong thi my duyen",
//   username: "truongmyduyen2704",
//   password: "myduyen",
//   email: "truongmyduyen@gmail.com",
//   age: 22,
//   balance: 50000,
//   gender: "male",
// };

// const jwt = jsonwebtoken.sign(
//   {
//     name: user.name,
//     username: user.username,
//     email: user.email,
//     age: user.age,
//     gender: user.gender,
//   },
//   SECRET,
//   {
//     algorithm: "HS256",
//     expiresIn: "5s",
//     issuer: "s-group",
//   }
// );

// // const userToken =
// //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidHJ1b25nIHRoaSBteSBkdXllbiIsInVzZXJuYW1lIjoidHJ1b25nbXlkdXllbjI3MDQiLCJlbWFpbCI6InRydW9uZ215ZHV5ZW5AZ21haWwuY29tIiwiYWdlIjoyMiwiZ2VuZGVyIjoibWFsZSIsImlhdCI6MTY4MTgyNjA5NCwiZXhwIjoxNjgxODI2MDk5LCJpc3MiOiJzLWdyb3VwIn0.hTwMT3FIMQaCgySpxXkgoy55z19UQyEuNx9-3tlt_zg";

// // const isTokenValid = jsonwebtoken.verify(userToken, SECRET);

// // console.log(isTokenValid);

const crypto = require("crypto");

const hashingPassword = (password) => {
  const hashObject = crypto.createHash("sha512");
  const hashedPassword = hashObject.update(password).digest("hex");
  console.log("hashedPassword: ", hashedPassword);
  return hashedPassword;
};

const saltPassword = (password) => {
  // Generate
  const salt = crypto.randomBytes(16).toString("hex");

  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  console.log(salt);
  console.log(hashedPassword);
  return hashedPassword;
};

// hashingPassword('le tuan')
// saltPassword('le tuan')
const SECRET = "le tuan";

//SYMETRIC: use one SECRET key
//Encrypt Rule:
//1. Append SECRET key in last password String
//2. Revert passwordString

const revertString = (str) => {
  const strList = str.split("");
  const strRevert = strList.reverse();
  return strRevert.join("");
};

const encrypt = (password) => {
  const input = password + SECRET;
  const inputRevert = revertString(input);
  console.log(inputRevert);
  return inputRevert;
};

const decrypt = (password) => {
  //Reverse String
  const passwordReverse = revertString(password);
  const passwordOrigin = passwordReverse.replace(SECRET, "");
  console.log("password: ", passwordOrigin);
};

encrypt("truongmyduyen");
decrypt("naut elneyudymgnourt");

//Asynmertric
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

const AEncrypt = (plainObject) => {
  const cipherText = crypto
    .publicEncrypt(
      {
        key: publicKey,
        oaepHash: "sha256",
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      Buffer.from(plainObject)
    )
    .toString("base64");
  console.log("cipherText: ", cipherText);
  //return cipherText
  return cipherText;
};

const ADecrypt = (cipherText) => {
  const plainObject = crypto
    .privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      Buffer.from(cipherText, 'base64')
    )
    .toString();
  console.log({ plainObject });
  //return plainObject
};

const cypherText = AEncrypt("le tuan");
ADecrypt(cypherText)
