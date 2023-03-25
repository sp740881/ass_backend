const express=require("express")
const { connection } = require("./db")
require('dotenv').config()
const { Noteroute } = require("./Routes/note.route")
const { route } = require("./Routes/user.route")
const app=express()
app.use(express.json())
app.use("/user",route)
app.use("/notes",Noteroute)
const port=process.env.PORT||8080

app.listen(port,async()=>{
try {
    await connection
    console.log("connected to DB")
} catch (error) {
    console.log(error)
}
})



