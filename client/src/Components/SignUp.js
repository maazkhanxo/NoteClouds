import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import authContext from '../Contexts/auth/authContext'

const SignUp = () => {
    const [ceredentials, setceredentials] = useState({ name: "", email: "", password: "" })
    const [cpassword, setcpassword] = useState("")
    const context = useContext(authContext)
    const { createUser } = context;

    let history = useHistory()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(cpassword.localeCompare(ceredentials.password)===0){
            await createUser(ceredentials.name, ceredentials.email, ceredentials.password)
        }
        if (localStorage.getItem('token')) {

            history.push('/')
        } else {
            alert("Wrong confirm password")
        }
    }
    const onChange = async (e) => {
   
        setceredentials({ ...ceredentials, [e.target.name]: e.target.value })
        if (e.target.name === 'cpassword') {
                setcpassword(e.target.value)
        
        }
    }
    const handleLogin = () => {
        history.push('/login')
    }
    return (
        <div className="container shadow-sm p-4 mb-5 bg-body rounded my-3">
            <h2 className='shadow-sm p-3 mb-5 bg-body rounded text-center fw-normal d-flex align-items-end justify-content-center' style={{ height: "8vh", paddingTop: "1.8rem" }}>Sign Up to NoteCloud</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                    <input type="text" name='name' onChange={onChange} className="form-control" id="name" minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' onChange={onChange} id="email" aria-describedby="emailHelp" minLength={5} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' onChange={onChange} className="form-control" id="password" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" name='cpassword' onChange={onChange} className="form-control" id="cpassword" minLength={5} required />
                </div>
                <button style={{ backgroundColor: 'rgb(234 234 234)', color: 'black' }} type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className="container my-4 text-center">
                <span>Already a Member? <i style={{ cursor: "pointer", color: "green" }} onClick={handleLogin}>log in</i></span>
            </div>
        </div>

    )
}

export default SignUp