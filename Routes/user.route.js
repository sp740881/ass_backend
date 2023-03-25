const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Model/user.model");
const route = express.Router();

route.get("/", (req, res) => {
  res.send("HOME");
});
route.post("/registation", async (req, res) => {
  try {
    bcrypt.hash(req.body.pass, 4,async(err, hash) =>{
      if(hash){
        req.body.pass=hash
        // console.log(hash)
        const user = new UserModel(req.body);
        await user.save();
        res.status(200).send({ msg: "User registered successfully" });
      }else{
        res.status(400).send(err.message);
      }
    
  });
   
  } catch (error) {
    res.status(400).send(error.message);
  }
});
///******************************************************* */
route.post("/login", async (req, res) => {
  if (!req.body.name || !req.body.pass) {
    res.status(400).send("wrong credential");
    return;
  }
  try {
    const user = await UserModel.find({name:req.body.name});
    console.log(user);
    if (user.length !== 0) {
      let token = jwt.sign(
        {_id:user[0]._id, name: user[0].name},
        "shivam432",
        { expiresIn: "1h" }
      );
      //   console.log(token);
      res.status(200).send(token);
    } else {
      res.status(400).send({ msg: "user is not registered" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});
//**********************************************************/
// route.get("/protected", (req, res) => {
//   const token = req.headers.authorization;
//   const tokendata = token.split(" ");
//   console.log(tokendata[1]);
//   jwt.verify(tokendata[1], "shivam432", (err, decoded) => {
//     decoded
//       ? res.status(200).send({ msg: "user authenticated" })
//       : res
//           .status(400)
//           .send({ msg: "user not authentocated for this process" }); // bar
//   });
// });

module.exports = { route };
