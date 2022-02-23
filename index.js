const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
const app = express();
const port = process.env.PORT;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const userRoutes = require("./routes/user.routes");

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(port, () => {
  console.log(`Server is Listening at port ${port} `);
});
