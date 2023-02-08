const express = require('express');
const router = express.Router()
const Notes = require('../models/Notes')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const fetchUser = require('../middleware/middleware')

router.post('/addNotes', fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user)
        if (user) {
            const addNotes = await Notes.create({
                user: req.user,
                name: user.name,
                title: req.body.title,
                description: req.body.description,
                bgColor:req.body.bgColor
            })

            res.send(addNotes)
        } else {
            res.status(404).send("User doesnt exists so create your account first")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server errors")
    }
})

router.post('/getNotes',fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({user:req.user})
        if(notes.length!=0){

            if(req.user===notes[0].user.toString()){
    
                res.json(notes)
            }
        }
        else if(notes.length===0){
            res.json([])
        }
        else {
            res.status(404).send('Not Allowed')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server errors")
    }

})

router.delete('/deleteNote/:id',fetchUser,async(req,res)=>{
    try {
        const notes = await Notes.findById(req.params.id)
        if (req.user === notes.user.toString()) {
           
            const deeltedNote = await Notes.findByIdAndDelete(req.params.id)
            res.send(deeltedNote)
        }
        else {
            res.status(404).send('Not Allowed')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server errors")
    }
})

router.put('/updateNotes/:id', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.findById(req.params.id)
        if (req.user === notes.user.toString()) {
            const updateNotes = {
                title: req.body.title,
                description: req.body.description
            }
            const changedNotes = await Notes.findByIdAndUpdate(req.params.id, { $set: updateNotes }, { new: true })
            res.send(changedNotes)
        }
        else {
            res.status(404).send('Not Allowed')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server errors")
    }
})

router.put('/updateBgColor/:id',fetchUser,async (req,res)=>{
    try {
        const notes = await Notes.findById(req.params.id)
        if(req.user===notes.user.toString()){
            const updatedColor = {
                bgColor:req.body.bgColor
            }
            const changedBgColor = await Notes.findByIdAndUpdate(req.params.id,{$set:updatedColor},{new:true})
            res.send(changedBgColor)
        }
    } catch (err) {
        console.log(error)
        res.status(500).send("Internal server errors")
    }
})


module.exports = router