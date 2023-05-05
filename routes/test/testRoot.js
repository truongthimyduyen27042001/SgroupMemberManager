const router = require("express").Router();
const Todo = require("../models/Todo");

//router will be here .....
router.get("/", async (req, res) => {
  const allTodo = await Todo.find()
  res.json(allTodo)
});

router.delete('/', async(req, res) => {
  await Todo.deleteMany().then(() => {
    res.send("Thuc hien xoa thanh cong")
  }).catch(() => {
    res.send("thuc hien xoa khong thanh cong")
  })
})

module.exports = router;
