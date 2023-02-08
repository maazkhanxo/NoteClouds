import React, { useState, useContext, useEffect } from 'react'
import Notes from './Notes'
import context from '../Contexts/notes/noteContext'
import { useHistory } from 'react-router-dom'
const Home = () => {

    const [note, setstate] = useState({ title: "", description: "" })
    const noteContext = useContext(context)
    const { addNote, getNotes } = noteContext

    const history = useHistory()

    useEffect(() => {
        let tokenjson = localStorage.getItem('token')
        if(tokenjson){
            getNotes()
        }else{
            history.push('/login')
        }
        // eslint-disable-next-line
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        addNote(note.title, note.description)
        setstate({ title: "", description: "" })
    }

    const onchange = (e) => {
        setstate({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="container my-3">
            <form className='container shadow-sm p-4 mb-4 bg-body rounded'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" value={note.title} onChange={onchange} id="title" placeholder="Add Title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" name="description" value={note.description} onChange={onchange} id="description" rows="3" placeholder="Add Description" ></textarea>
                </div>
                <div>
                    <button type="button" onClick={handleSubmit} style={{ backgroundColor: 'rgb(234 234 234)' }} className="btn">Add Note</button>
                </div>
            </form>

            <Notes />
        </div>
    )
}

export default Home