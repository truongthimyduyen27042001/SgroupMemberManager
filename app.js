const express = require("express");
const app = express();

const userRoutes = require("./routes/user");
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(userRoutes);

app.listen(3000, () => console.log("server started listening on port: 3000"));
