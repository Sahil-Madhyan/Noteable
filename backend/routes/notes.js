const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");

// Set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

// Apply rate limiter to all requests
router.use(limiter);

//? @route   GET /notes/fetchnotes
router.get("/fetchnotes", fetchuser, async (req, res) => {
    try {
        //? Fetching all notes of a user
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//? @route   POST /notes/addnote
router.post(
    "/addnote",
    fetchuser,
    [
        //? Validating the title, description and tag
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body(
            "description",
            "Description must be atleast 5 characters"
        ).isLength({ min: 5 }),
    ],
    async (req, res) => {
        try {
            //? Destructuring the title, description and tag from req.body
            const { title, description, tag } = req.body;
            //? If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            //? Creating a new note
            const note = new Notes({
                title,
                description,
                tag,
                user: req.user.id,
            });
            //? Saving the note to the database
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

//? @route   PUT /notes/updatenote/:id
//? /updatenote/:id is a dynamic parameter, :id is the id of the note to be updated
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        //? Destructuring the title, description and tag from req.body
        const { title, description, tag } = req.body;
        //? Creating a newNote object
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }
        //? Finding the note to be updated and updating it
        let note = await Notes.findById(req.params.id); //? req.params.id is the id of the note to be updated
        if (!note) {
            return res.status(404).send("Not Found");
        }
        //? If the user is not the owner of the note, return Not Allowed
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        ); //? $set is used to set the newNote object, new: true is used to return the updated note
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//? @route   DELETE /notes/deletenote/:id

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        //? Finding the note to be deleted and deleting it
        let note = await Notes.findById(req.params.id); //? req.params.id is the id of the note to be deleted
        if (!note) {
            return res.status(404).send("Not Found");
        }
        //? If the user is not the owner of the note, return Not Allowed
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id); //? req.params.id is the id of the note to be deleted
        res.json({ Success: "Note has been deleted", note: note }); //?note: note is the deleted note
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
