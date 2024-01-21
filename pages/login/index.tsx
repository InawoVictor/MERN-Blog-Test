import React, { useState } from 'react'

const Login = () => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

  return (
    <div>
        <div className="login">
            <h1 className="login--title">Login</h1>
            <form className="login--form">
                <label>Username</label>
                <input
                onChange={e => setUsername(e.target.value)}
                className="login--input" type="text" placeholder="Enter your email..." />
                <label>Password</label>
                <input
                onChange={e => setPassword(e.target.value)}
                className="login--input" type="password" placeholder="Enter your password..." />
                <button className="login--btn">Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login