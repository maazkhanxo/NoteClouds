import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import authContext from '../Contexts/auth/authContext'

const Login = () => {
    const [ceredentials, setceredentials] = useState({ email: "", password: "" })
    const context = useContext(authContext)

    const { login } = context;

    let history = useHistory()

    const handleSubmit = async () => {
        await login(ceredentials.email, ceredentials.password)
        history.push('/')
    }

    const handleSign = (e) => {
        e.preventDefault()
        history.push('/signup')
    }

    const onChange = (e) => {
        setceredentials({ ...ceredentials, [e.target.name]: e.target.value })
    }


    return (
        <div className='container shadow-sm p-3 mb-5 bg-body rounded my-3 ' >
            <h2 className=' d-flex fw-normal shadow-sm p-3 mb-5 bg-body rounded align-items-end justify-content-center my-4' style={{ height: "8vh"}}>Login To NoteCloud <i className="fas fa-clipboard mx-2"></i> </h2>

            <div className="my-2 container d-flex flex-column justify-content-center" style={{ height: "40vh", padding: "5vw" }}>
                <form >
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><i className="fas fa-user"></i></span>
                        <input type="email" className="form-control" placeholder="someone@xyz.com" name='email' onChange={onChange} aria-label="EMAIL" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon2"><i className="fas fa-lock"></i></span>
                        <input type="password" className="form-control" autoComplete='password' placeholder="*******" name='password' onChange={onChange} aria-label="PASSWORD" aria-describedby="basic-addon1" />
                    </div>
                    <button style={{ backgroundColor: 'rgb(234 234 234)', color: 'black' }} type='button' onClick={handleSubmit} className='btn text'>Submit</button>
                </form>
                <div className="container my-4 text-center">
                    <span>New to NoteCloud  ? <i style={{ cursor: "pointer", color: "green" }} onClick={handleSign}>Sign in</i></span>
                </div>
            </div>
        </div>
    )
}

export default Login