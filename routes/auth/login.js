const jsonwebtoken = require('jsonwebtoken')
const { getOne } = require('../../database/query');
const connection = require('../../database/connection');
const { comparePassword } = require('../../hash/hash');


//login 
const login = async (req, res) => {
  const {email, password} = req.body;

  //Step 1. Find user in database 
  const currentUser = await getOne({db: connection, query: 'select * from Student where email = ?', params: email})
  console.log('current user: ', {
    ...currentUser
  })
  if(!currentUser) {
    return res.status(404).json({
      error: 'User is existed'
    })
  } 

  //Step 2. Generate password and check isMatching password

  const isValidPassword = await comparePassword(currentUser.password, currentUser.salt, password);

  if(isValidPassword) {
    return res.status(404).json({
      error: 'Password is not match'
    })
  }


  //Step 3. Register token and return token
  const jwt = jsonwebtoken.sign({
    ...currentUser,
    password: '',
  }, process.env.SECRET, {
    algorithm: 'HS256',
    expiresIn: '1d'
  })

  return res.status(200).json({
    ...currentUser,
    password: '',
    token: jwt
  })
}

module.exports = login;