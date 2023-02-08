import React, { useContext, useRef, useState } from 'react'
import noteContext from '../Contexts/notes/noteContext'
import NotesItem from './NotesItem';

const Notes = () => {
    

    const noteState = useContext(noteContext)
    const { note, updateNote, deleteNote,bgColorPicker } = noteState

    const [enote, setnote] = useState({ etitle: "", edescription: "" })
    const [id, setid] = useState('')
    const ref = useRef(null)           

    const handleupdateNote = (currentnote) => {
        ref.current.click()
        setid(currentnote._id)
        setnote({ etitle: currentnote.title, edescription: currentnote.description })
    }
    
    const deleteNotes = (idofuser) => {
        deleteNote(idofuser)
    }

    const onchange = (e) => {
        setnote({ ...enote, [e.target.name]: e.target.value })
    }

    const handlesavedNote = (e) => {
        e.preventDefault()
        updateNote(id, enote.etitle, enote.edescription)
    }

    return (
        <div>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Hidden
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Notes</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" value={enote.etitle} className="form-control" name="etitle" onChange={onchange} id="etitle" placeholder="Add Title" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea value={enote.edescription} className="form-control" name="edescription" onChange={onchange} id="edescription" rows="3" placeholder="Add Description" ></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" data-bs-dismiss="modal" onClick={handlesavedNote} className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="row" style={{justifyContent:'center'}}>
                    {
                        note.map((note) => {
                            return <NotesItem uniqueId={note._id} key={note._id} deleteNote={deleteNotes} updateNote={handleupdateNote} note={note} bgColorPicker={bgColorPicker} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Notes