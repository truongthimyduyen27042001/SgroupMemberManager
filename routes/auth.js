const jsonwebtoken = require("jsonwebtoken");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();

const SECRET = "duyen-truong";

//Asynmertric
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

const dbs = [
  {
    name: "truong thi my duyen",
    username: "truongmyduyen2704",
    password: "myduyen",
    email: "truongmyduyen@gmail.com",
    age: 22,
    balance: 50000,
    gender: "male",
  },
  {
    name: "Le Tuan",
    username: "letuan",
    password: "letuan",
    email: "letuan@gmail.com",
    age: 22,
    balance: 50000,
    gender: "male",
  },
  {
    name: "Thao Van",
    username: "thaovan",
    password: "thaovan",
    email: "thaovan@gmail.com",
    age: 22,
    balance: 50000,
    gender: "male",
  },
];

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  // const jwt = jsonwebtoken.sign({
  //   username,
  //   name,
  //   gender,
  //   age,
  // });

  //Step 1. Find user in database
  const user = dbs.find((user) => user.username === username);

  if (!user)
    return res.status(404).json({
      message: "User not found",
    });

  if (user.password === password) {
    //create token
    const jwt = jsonwebtoken.sign(
      {
        username: user.username,
        password: user.password,
      },
      SECRET,
      {
        algorithm: "HS256",
        expiresIn: "1d",
      }
    );
    //return token

    return res.status(200).json({
      user,
      jwt,
    });
  }

  return res.status(404).json({
    message: "Password is invalid",
  });
});

router.post("/login/asymmetric", (req, res, next) => {
  const { username, password } = req.body;
  // const jwt = jsonwebtoken.sign({
  //   username,
  //   name,
  //   gender,
  //   age,
  // });

  //Step 1. Find user in database
  const user = dbs.find((user) => user.username === username);

  if (!user)
    return res.status(404).json({
      message: "User not found",
    });

  if (user.password === password) {
    //create token
    const jwt = jsonwebtoken.sign(
      {
        username: user.username,
        password: user.password,
      },
      privateKey,
      {
        algorithm: "RS256",
        expiresIn: "1d",
      }
    );

    //return token
    return res.status(200).json({
      user,
      jwt,
    });
  }

  return res.status(404).json({
    message: "Password is invalid",
  });
});

const validateToken = (req, res, next) => {
  const username = req.query.username;
  console.log("username: ", username);
  const authorizationHeader = req.headers.authorization;
  // BEAR <>
  const userToken = authorizationHeader.substring(7);
  try {
    const isTokenValid = jsonwebtoken.verify(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRydW9uZ215ZHV5ZW4yNzA0IiwicGFzc3dvcmQiOiJteWR1eWVuIiwiaWF0IjoxNjgxODI4MTY5LCJleHAiOjE2ODE5MTQ1Njl9.R-A2q-hgb9l8T9CHrWydEdKddNu9XiqbRWKb8opdx4Y",
      SECRET
    );
    req.user = isTokenValid;
    //authentication success
    if (isTokenValid.username == username) {
      console.log("hop le");
      next();
    }
    //authentication failed
  } catch (error) {
    return res.status(404).json({
      message: "Token is invalid",
    });
  }
};

const validateTokenAsymmetric = (req, res, next) => {
  const username = req.query.username;
  console.log("username: ", username);
  const authorizationHeader = req.headers.authorization;
  // BEAR <>
  const userToken = authorizationHeader?.substring(7);
  try {
    const isTokenValid = jsonwebtoken.verify(
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxldHVhbiIsInBhc3N3b3JkIjoibGV0dWFuIiwiaWF0IjoxNjgyMDg2ODI2LCJleHAiOjE2ODIxNzMyMjZ9.RSsMb_rj6dkA054fuau9OpWQUXpnhzEhvY4OWUOZ1mgA5j1jbu2yI3nGHjFYzsn1fD8Js9ozBhUNVCQ_IdwDDeLxijGB1UP4aOAneJnW_6okfqWJnGSB9JgPICXF5UNnKuplY2eM3oeA5tO67YiZAV5YEvEAVbw3F80N6dBa_hOzKVZo4BJtuZYkukSsuD8hXqHgEUN-rkh4_q8vkd4bry5BUeB93xdKJKFYDKZSSWHMG7RZtJb4JotCDKZyNRsrXVjgJkiT4HrI9bi8Y-9bP94VzZqrGS1bHN2njdRdmFqJUb-Ordcyin3gYvJWabI6kaR8zBo2SqVJTU_5zoX40g",
      publicKey
    );
    console.log('token: ', isTokenValid)
    //authentication success
    if (isTokenValid.username == username) {
      console.log("hop le");
      next();
    }
    //authentication failed
  } catch (error) {
    return res.status(404).json({
      message: "Token is invalid",
    });
  }
};

router.get("/balance", validateToken, (req, res) => {
  const username = req.query.username;
  const user = dbs.find((user) => user.username === username);
  console.log("decode: ", req.user);
  if (user) {
    const { balance } = user;
    return res.status(200).json({
      balance,
    });
  }
  return res.status(404).json({
    message: "user is invalid",
  });
});

router.get("/balance/asymmetric", validateTokenAsymmetric, (req, res) => {
  const username = req.query.username;
  const user = dbs.find((user) => user.username === username);
  console.log("decode: ", req.user);
  if (user) {
    const { balance } = user;
    return res.status(200).json({
      balance,
    });
  }
  return res.status(404).json({
    message: "user is invalid",
  });
});

module.exports = router;
