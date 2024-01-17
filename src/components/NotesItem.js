import React from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';

export const NotesItem = (props) => {
  const context = useContext(NoteContext);
  const {deleteNote} = context; 
  const { note, updateNote} = props;
  return (
    <div className={`col-md-3 bg-${props.mode === 'light' ? 'white' : 'dark'} text-${props.mode === 'light' ? 'dark' : 'light'}`}>
      <div className={`card my-3 shadow-sm bg-${props.mode === 'light' ? 'white' : 'dark'} text-${props.mode === 'light' ? 'dark' : 'light'} border-${props.mode === 'light' ? '' : 'light'}`} style={{ minWidth: "18rem" }}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div className="icons">
              <i className="fa-solid fa-trash" title="Delete Note" id="deleteIcon" onClick={()=>{deleteNote(note._id)}}></i>
              <i className="fa-solid fa-pen-to-square mx-3" title="Edit Note" id="editIcon" onClick={() => { updateNote(note)}}></i>
            </div>
          </div>
          <h6 className={`card-subtitle my-1 mb-2 d-inline-block border border-2 rounded-pill p-1 text-${props.mode === 'light' ? 'muted' : 'white'}`}>
            {note.tag}</h6>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  )
}
