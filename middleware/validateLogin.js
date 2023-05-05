const validate = (req, res, next) => {
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)) {
    return res.status(404).json({
      error: 'Email is invalid'
    })
  }

  if(password.length < 3) {
    return res.status(404).json({
      error: 'Your password is not valid'
    })
  }

  next()
};


module.exports = validate;