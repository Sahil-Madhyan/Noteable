import React from 'react'
import { useContext, useState } from 'react';
import NoteContext from '../context/notes/noteContext';

export const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        props.newAlert("success", "Note Added Successfully");
        setNote({ title: "", description: "", tag: "" });
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value }); //? ...Note means that we are copying the Note object and then we are changing the value of the name attribute of the input field
    }
    return (
        <div>
            <div className={`container mt-5 border border-2 rounded shadow-sm p-4 bg-${props.mode === 'light' ? 'light' : 'dark'} text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                <h2>Add a Note</h2>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="titleHelp" value={note.title} onChange={onChange} minLength={5} required />
                        <div id="titleHelp" className={`form-text text-${props.mode === 'light' ? 'muted' : 'white'}`}>Min. 5 Characters Required</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} aria-describedby="descriptionHelp" required />
                        <div id="descriptionHelp" className={`form-text text-${props.mode === 'light' ? 'muted' : 'white'}`}>Min. 5 Characters Required</div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <div className="input-group">
                            <span className="input-group-text">#</span>
                            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                        </div>
                    </div>

                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary d-flex" onClick={handleClick}>
                        <div className="icon mx-1">
                            <i className="fa-solid fa-plus"></i>
                        </div>
                        <div className="content mx-1">
                            Add Note
                        </div>
                    </button>
                </form>
            </div>
        </div>
    )
}
