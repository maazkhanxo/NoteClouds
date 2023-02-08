import { useState } from "react";
import NoteContext from "../notes/noteContext";

const NoteState = (props) => {
    const initial = []
    const [note, setnote] = useState(initial)

    const getNotes = async () => {
        await fetch('https://noteclouds.herokuapp.com/notes/getNotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(localStorage.getItem('token')).authToken
            }
        }).then(res => res.json()).then(data => {
            setnote(data)
            })
    }

    const updateNote = async (id, title, description) => {
        await fetch(`https://noteclouds.herokuapp.com/notes/updateNotes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(localStorage.getItem('token')).authToken
            },
            body: JSON.stringify({
                "title": title,
                "description": description
            })
        })

        let newNotes = JSON.parse(JSON.stringify(note))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
            }
        }
        setnote(newNotes);
    }

    const addNote = async (title, description) => {
        await fetch('https://noteclouds.herokuapp.com/notes/addNotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(localStorage.getItem('token')).authToken

            },
            body: JSON.stringify({
                "title": title,
                "description": description
            })
        }).then(res => res.json()).then(data => {
            setnote(note.concat(data))})
    }

    const deleteNote = async (id) => {
        await fetch(`https://noteclouds.herokuapp.com/notes/deleteNote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(localStorage.getItem('token')).authToken

            }
        })

        const newNotes = note.filter((note)=>{return note._id!==id})
        setnote(newNotes)
    }

    const bgColorPicker = async (id,bgColor) =>{
        await fetch(`https://noteclouds.herokuapp.com/notes/updateBgColor/${id}`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(localStorage.getItem('token')).authToken

            },
            body: JSON.stringify({
                "bgColor": bgColor
            })
        })

        let newNotes = JSON.parse(JSON.stringify(note))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                element.bgColor = bgColor;
            }
        }
        setnote(newNotes);
    }

    return (
        <NoteContext.Provider value={{ note, getNotes, addNote, updateNote, deleteNote,bgColorPicker }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;