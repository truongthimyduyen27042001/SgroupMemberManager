const { updateById } = require("../../database/query");
const connection = require("../../database/connection");

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, name, age, gender, email } = req.body;
    const currentUser = await updateById({
      db: connection,
      query:
        "update Student set username=?, email=?, age=?, gender=?, name=? where id=?",
      params: [username, email, Number(age), Boolean(gender), name, id],
    });
    res.status(200).json({
      message: 'Update successfully',
      userInfo: currentUser
    })
    res.send('check')
  } catch (error) {
    console.log("error: ", error);
    return res.status(404).json({
      message: "update failed",
      error,
    });
  }
};

module.exports = updateUser;
