const jwt = require("jsonwebtoken");
const auth=(req,res,next)=>{
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      console.log(token);
      try {
        jwt.verify(token, "shivam432", async (err, code) => {
          if (code) {
            req.body.userId=code._id
           next()
          } else {
            res.send(err.message);
          }
        });
      } catch (error) {
        res.send(error.message);
      }
    } else {
      res.send("token not present");
    }
}
module.exports={auth}