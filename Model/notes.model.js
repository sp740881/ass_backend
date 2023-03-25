const mongoose=require("mongoose")

const NotesScheme=mongoose.Schema({
    title:String,
    desc:String,
    userId:String
})

const NotesModel=mongoose.model("notes",NotesScheme)
module.exports={NotesModel}