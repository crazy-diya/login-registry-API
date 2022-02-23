const database = require("../config/db.config");
const bcrypt = require("bcrypt");
const e = require("express");

var User = function (user) {
  this.fname = user.fname;
  this.lname = user.lname;
  this.email = user.email;
  this.password = user.password;
};

User.CreateRegisterinServer = async (newUser, result) => {
  await database.query(
    "Select email from users where email = ?",
    newUser.email,
    async (err, res) => {
      if (err) {
        console.log(err);
        result(err, "");
      } else {
        if (res.length > 0) {
          result("", "Alreasy Exist that email Address!");
        } else {
          // https://www.npmjs.com/package/bcrypt
          newUser.password = bcrypt.hashSync(newUser.password, 10); // https://jasonwatmore.com/post/2020/07/20/nodejs-hash-and-verify-passwords-with-bcrypt
          await database.query(
            "insert into users set ?",
            newUser,
            (err, res) => {
              if (err) {
                console.log("err while inserting Data!");
                result(err, "");
              } else {
                console.log("insert data successfully!");
                result("", {
                  code: 201,
                  message: "Successfully Created!",
                  data: res,
                });
              }
            }
          );
        }
      }
    }
  );
};
User.LoginExistingUser = async (loginDetails, result) => {
  await database.query(
    "select email from users where email = ?",
    loginDetails.email,
    async (err, res) => {
      if (err) {
        result({
          code: 404,
          message: "Database Error while selecting data!",
          err:err
        }, "");
      } else {
        if (res.length === 0) {
          result("", {
            code: 206,
            message: "There havent any kind of email",
            err:err
          },);
        } else {
          database.query(
            "select password from users where email = ?",
            loginDetails.email,
            (err, res) => {
              if (err) {
                result(
                  {
                    code: 500,
                    message: "While checking password Database error!",
                    err:err
                  },
                  ""
                );
              } else {
                const verified = bcrypt.compareSync(
                  loginDetails.password,
                  res[0].password
                );
                if (!verified) {
                  result(
                    {
                      code: 405,
                      message: "Password Wrong!"
                      
                    },
                    ""
                  );
                } else {
                  result("", {
                    code: 202,
                    message: "Successfully Login!",
                    hashPassword: verified
                  });
                }
              }
            }
          );
        }
      }
    }
  );
};

User.Login = async (userData, result) => {};
module.exports = User;
