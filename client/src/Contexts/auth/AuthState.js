import React from 'react'
import AuthContext from './authContext'

const AuthState = (props) => {

    const login = async (email, password) => {

        await fetch('https://noteclouds.herokuapp.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res => res.json()).then(data => {
           if(data.authToken){

               localStorage.setItem('token', JSON.stringify(data))
           }
        }).catch(err => console.log(err))
    }

    const createUser = async (name, email, password) => {
        await fetch('https://noteclouds.herokuapp.com/auth/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password
            })
        }).then(res => res.json()).then(data => {
            if(data.authToken){
                localStorage.setItem('token', JSON.stringify(data))
            }
        }).catch(error=>console.log({error}))
    }

    return (
        <div>
            <AuthContext.Provider value={{ login, createUser }}>
                {props.children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthState