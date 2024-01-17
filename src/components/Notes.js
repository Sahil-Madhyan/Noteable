import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/noteContext';
import { NotesItem } from './NotesItem';
import { AddNote } from './AddNote';
import { useNavigate } from 'react-router-dom';

export const Notes = (props) => {
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const updateNote = (currentNote) => {
        ref.current.click(); //? This will click the button with id="staticBackdrop"
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        props.newAlert("success", "Note Updated Successfully");
        e.preventDefault();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value }); //? ...Note means that we are copying the Note object and then we are changing the value of the name attribute of the input field
    }
    return (
        <>
            <AddNote mode={props.mode} newAlert={props.newAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className={`modal-content bg-${props.mode === 'light' ? 'white' : 'dark'} text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel"><i className="fa-solid fa-square-pen mx-2"></i>Update Note</h1>
                            <button type="button" className="btn justify-content-center align-items-center"
                                data-bs-dismiss="modal" aria-label="Close"><i className={`fa-solid fa-xmark text-${props.mode === 'light' ? 'dark' : 'light'} fs-5`}></i></button>

                        </div>
                        <div className="modal-body">
                            <div className="container my-3 border border-2 rounded shadow-sm p-4">
                                <form className="my-3">
                                    <div className="mb-3">
                                        <label htmlFor="etitle" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edescription" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} minLength={5} required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="etag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button disabled={note.etitle.length<5 || note.edescription.length<5}type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClick}><i className="fa-solid fa-pen-to-square mx-2"></i>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`container p-2 bg-${props.mode === 'light' ? 'white' : 'dark'} text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                <h2><i className="fa-solid fa-note-sticky fs-3 me-2 mt-4"></i>Your Notes</h2>
                <div className="row">
                    {notes.length === 0 && <div className="container text-center fs-4 my-3">No Notes to Display</div>}
                    {notes.map((note) => {
                        return <NotesItem note={note} updateNote={updateNote} key={note._id} mode={props.mode} newAlert={props.newAlert} />
                    })}
                    
                </div>


            </div>
        </>
    )
}
