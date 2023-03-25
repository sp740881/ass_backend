const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NotesModel } = require("../Model/notes.model");
const { auth } = require("../middleware/auth.middleware");
const Noteroute = express.Router();

Noteroute.get("/",auth, async (req, res) => {

    const note = await NotesModel.find({userId:req.body.userId});
    // console.log(code._id);
    res.send(JSON.stringify(note));
});
Noteroute.post("/add",auth, async (req, res) => {
    const note =new NotesModel(req.body);
    const data= await note.save()
    console.log(data);
    res.send(JSON.stringify(data));
  });
  Noteroute.delete("/delete/:id",auth, async (req, res) => {
    const NoteId=req.params.id
    const userId=req.body.userId
    try {
        await NotesModel.findByIdAndDelete({userId:userId,_id:NoteId})
         res.send("data deleted successfully")
    } catch (error) {
        res.send(error.message)
    }

  });
  Noteroute.patch("/edit/:id",auth, async (req, res) => {
    const NoteId=req.params.id
    const userId=req.body.userId
    try {
        await NotesModel.findByIdAndUpdate({userId:userId,_id:NoteId},{$set:req.body})
         res.send("data updated successfully")
    } catch (error) {
        res.send(error.message)
    }

  });


module.exports = { Noteroute };
