import React, { useState } from 'react'

const Register = () => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 
    const [email, setEmail] = useState('') 
    const [error, setError] = useState(false) 
    const [isFetching, setisFetching] = useState(true)

    const handleSubmit = () => {
        console.log("submit");
        
    }

    return (
        <div className="register">
            <span className="register--title">Register</span>
            <form className="register--form" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                onChange={e => setUsername(e.target.value)}
                className="register--input" type="text" placeholder="Enter your username..." />
                <label>Email</label>
                <input
                onChange={e => setEmail(e.target.value)}
                className="register--input" type="text" placeholder="Enter your email..." />
                <label>Password</label>
                <input
                onChange={e => setPassword(e.target.value)}
                className="register--input" type="password" placeholder="Enter your password..." />
                <button className="register--btn">Register</button>
            </form>
                { error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
        </div>
    )
}

export default Register