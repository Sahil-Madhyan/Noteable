import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const url = "http://localhost:5000/api/notes";
    const intialNotes = []
    const [notes, setNotes] = useState(intialNotes);

    //? Fetch all notes
    const getNotes = async () => {
        //? API call
        const response = await fetch(`${url}/fetchnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }
    
    //? TODO: Add a note
    const addNote = async (title, description, tag) => {
        //? API call
        tag = "#" + tag;
        const response = await fetch(`${url}/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),

            },
            body: JSON.stringify({ title, description, tag }),
        });
        console.log("Adding a new note");
        const note = await response.json();
        setNotes(notes.concat(note)); //? concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.
    }

    //? TODO: Delete a note
    const deleteNote = async (id) => {
        //? API call
        const response = await fetch(`${url}/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
        });
        const json = await response.json();
        console.log(json);
        console.log("Deleting a note with id:" + id);
        const newNotes = notes.filter((note) => { //? filter() method creates a new array with all elements that pass the test implemented by the provided function.
            return note._id !== id;
        });
        setNotes(newNotes);
        props.newAlert("success", "Note Deleted Successfully");
    }
    
    //? TODO: Edit a note
    const editNote = async (id, title, description, tag) => {
        //? API call to edit note
        const response = await fetch(`${url}/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),

            },
            body: JSON.stringify({ id, title, description, tag }),
        });
        const json = await response.json();
        console.log(json);
        let newNotes = JSON.parse(JSON.stringify(notes)); //? JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string. JSON.stringify() method converts a JavaScript object or value to a JSON string.
        //? Logic to edit a note at client side
        for(let i=0; i<newNotes.length; i++){
            const note = newNotes[i];
            if (note._id === id) {
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
            }
        }
        setNotes(newNotes);

    }
    
    return (
        <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}> {/* NoteContext.Provider is a component that takes a value prop and makes it available to all its child components and their children. This is how we pass the state to all the components.*/}
            {props.children} {/* props.children is a special prop that is used to display whatever you include between the opening and closing tags when invoking a component */}
        </NoteContext.Provider>
    )
}

export default NoteState;