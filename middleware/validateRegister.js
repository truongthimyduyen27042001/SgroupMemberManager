const validate = (req, res, next) => {
  const {username, password, confirmPassword, email, name, age, gender} = req.body;
  console.log('username: ', username)
  if(username.length < 3 || password.length < 3 || name.length < 2) {
    return req.status(404).json({
      error: 'Username or password or name is not valid'
    })
  }
  if(password !== confirmPassword ) {
    return res.status(404).json({
      error: 'Your password and confirmPassword is not match'
    })
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)) {
    return res.status(404).json({
      error: 'Email is invalid'
    })
  }
  next()
}

module.exports = validate;