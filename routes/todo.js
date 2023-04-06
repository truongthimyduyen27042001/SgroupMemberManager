const router = require("express").Router();
const Todo = require("../models/Todo");

router
  .post("/add", (req, res) => {
    const todo = req.body;
    console.log(req.body);
    const newTodo = new Todo(todo);

    newTodo
      .save()
      .then(() => {
        console.log("Successfully added todo!");
        res.send("Successfully added todo!");
      })
      .catch((err) => res.send("That bai"));
  })
  .get("/delete/:_id", (req, res) => {
    const { _id } = req.params;
    Todo.deleteOne({ _id })
      .then(() => {
        console.log("Deleted Todo Successfully");
        res.send("Successfully delete todo!");
      })
      .catch((err) => res.send("That bai"));
  })
  .post("/update/:id", async (req, res) => {
    const newTodo = req.body;
    const { id } = req.params;
    console.log("id: ", id);
    await Todo.updateOne({ _id: id }, newTodo)
      .then(async () => {
        const allTodo = await Todo.find()
        console.log('thuc hien thanh cong')
        res.send(allTodo)
      })
      .catch(() => res.send("That bai"));
  })
  .post('/updateAll', async (req, res) => {

  })

module.exports = router;
