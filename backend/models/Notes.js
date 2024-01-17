const mongoose = require("mongoose");
const { Schema } = mongoose;

//? Creating a schema for the notes
const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "GenZ"
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

//? Creating a model for the notes
module.exports = mongoose.model("notes", NotesSchema);
