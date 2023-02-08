import React, { useState, useRef } from 'react'
import { CompactPicker } from 'react-color'

const NotesItem = (props) => {
    const { note, updateNote, deleteNote, uniqueId, bgColorPicker } = props;
    const ref = useRef(null)

    const [color, setcolor] = useState(note.bgColor);

    const handleChangeComplete = (color) => {
        setcolor(color.hex)
        bgColorPicker(note._id, color.hex)
    }


    const handleupdate = () => {
        ref.current.click()
    }



    return (
        
        <div className="notebody shadow p-2 mb-3 rounded col-md-3 card mx-2 my-2" style={{ backgroundColor: `${color}` }}>

            <div className="card-body" >
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text ">{(note.description.length > 50) ? (
                    <>
                        {note.description.slice(0, 50)}
                        <i className="italics" onClick={handleupdate} style={{ cursor: "pointer" }}> ...more</i>
                        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#aexampleModal">
                            Hidden
                        </button>
                        <div class="modal fade"   id="aexampleModal" tabindex="-1" aria-labelledby="aexampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="aexampleModalLabel">{note.title}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        {note.description}
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
                    : note.description}</p>


                <i className="far fa-edit mx-2" onClick={() => updateNote(note)} style={{ cursor: "pointer" }}></i>
                <i className="far fa-trash-alt" onClick={() => deleteNote(uniqueId)} style={{ cursor: "pointer" }}></i>
                <i className="dropdown">
                    <i className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    </i>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <CompactPicker onChangeComplete={handleChangeComplete} />

                    </ul>
                </i>

            </div>
        </div>

    )
}

export default NotesItem
