const { hashingPassword } = require('../../hash/hash')
const connection = require('../../database/connection')
const { getOne } = require('../../database/query')

//register
const register = async (req, res) => {
  const {username, password, name, age, gender, email} = req.body;

  //check not existed user in database 
  const currentUser = await getOne({db: connection, query: 'select * from Student where username = ?', params: username})
  if(!!currentUser) {
    return res.status(404).json({
      error: 'User is existed'
    })
  } 
  //hashing password 
  const {salt, hashedPassword} = hashingPassword(password)

  await connection.query(`insert into Student(username, password, salt, name, gender, age, email) values(?,?,?,?,?,?,?)`, [
    username,
    hashedPassword,
    salt,
    name,
    Boolean(gender),
    Number(age),
    email
  ], (error) => {
    if(error) {
      return res.status(404).json({
        error
      })
    }
    return res.status(201).json({
      message: 'Register successfully',
      ...currentUser
    })
  })
}

module.exports = register;