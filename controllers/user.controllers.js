const UserModel = require("../models/user.model");
const { validationResult } = require("express-validator");
// const bcrypt = require("bcrypt");

exports.registerNewUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    // const newUser = new UserModel({
    //   fname: req.body.fname,
    //   lname: "Dayana",
    //   email: req.body.email,
    //   password:  req.body.password,
    // });
    var newUser = new UserModel(req.body);
    // // https://www.npmjs.com/package/bcrypt
    // newUser.password = bcrypt.hashSync(req.body.password, 10); // https://jasonwatmore.com/post/2020/07/20/nodejs-hash-and-verify-passwords-with-bcrypt
    // if (newUser.password) {
      UserModel.CreateRegisterinServer(newUser, (err, user) => {
        if (err) {
          res.send(err);
        } else {
          res.status(201).json({
            status: true,
            code: 201,
            message: "create Successfully",
            data: user,
          });
        }
      });
    // }
  }

  //   if (req.body.constructor == Object && Object.keys(req.body).length === 0) {
  //     console.log("empty data insertion!");
  //     res.status(400).send({ success: false, message: "Please fill all Fields" });
  //   } else {
  //     // const newUser = new UserModel(req.body);
  //     const newUser = new UserModel({
  //       fname: req.body.fname,
  //       lname: "dn",
  //       email: req.body.lname,
  //       password: "sb",
  //     });
  //     UserModel.CreateRegisterinServer(newUser, (err, user) => {
  //       if (err) {
  //         res.send(err);
  //       } else {
  //         res.status(201).json({
  //           status: true,
  //           code: 201,
  //           message: "create Successfully",
  //           data: user,
  //         });
  //       }
  //     });
  //   }
};

exports.loginUser = async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else{
    UserModel.LoginExistingUser(req.body,(err,user)=>{
      if (err) {
        res.send(err);
      } else {
        res.status(200).json({
          status: true,
          code: 200,
          data: user,
        });
      }
    })
  }
    
}
