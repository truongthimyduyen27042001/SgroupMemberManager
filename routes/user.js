const router = require("express").Router();
const connection = require("../database/connection");

router.get("/", (req, res) => {
  connection.query(`Select * from Student`, (error, results) => {
    if (!error) {
      console.log("thanh cong");
      return res.json({
        message: "thanh cong",
        data: results,
      });
    }
    return res.json({
      message: "that bai",
      error,
    });
  });
});

router.post("/", (req, res) => {
  const student = req.body;
  connection.query(
    `insert into Student(fullName, gender, age) values(?,?,?)`,
    [student.fullName, Boolean(student.gender), parseInt(student.age)],
    (error, result) => {
      console.log("loi: ", error);
      if (!error) {
        return res.status(201).json({
          message: "them thanh cong",
          data: result,
        });
      }
      return res.status(404).json({
        message: "them that bai",
        error,
      });
    }
  );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const student = req.body;
  connection.query(
    `update Student set fullName=?, gender=?, age=? where id=${id}`,
    [student.fullName, Boolean(student.gender), parseInt(student.age)],
    (error, result) => {
      if (!error) {
        return res.status(204).json({
          message: "update successfully",
          data: result,
        });
      }
      return res.status(404).json({
        message: "update failed",
        error,
      });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  connection.query(`delete from Student where id=?`, [id], (error, result) => {
    if(!error) {
      console.log('delete successfully')
      return res.status(204).json({
        message: 'Delete successfully',
        data: result
      })
    }
    else console.log('delete failed')
    return res.status(404).json({
      message: 'Delete failed',
      error
    })
  })
});

module.exports = router;
