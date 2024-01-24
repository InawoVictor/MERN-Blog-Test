import { useLoginMutation } from '@/redux/auth/authApi';
import { setCredentials } from '@/redux/auth/authSlice';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Login = () => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [login,{ data, error}] = useLoginMutation()
    const dispatch = useDispatch()
    const router = useRouter()

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,{
          username, password
        });
        const {token, ...others} = res.data
        dispatch(setCredentials({accessToken: token, user: others}))
        router.push("/")
        toast.success("Logged in successfully 😊")
      } catch (error) {
        console.log(error);
        if( error.response.status === 400) {
          toast.error("Invalid credentials 😞")
        }
        
      }
    }

  return (
    <div>
        <div className="login">
            <h1 className="login--title">Login</h1>
            <form className="login--form" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                onChange={e => setUsername(e.target.value)}
                className="login--input" type="text" placeholder="Enter your email..." />
                <label>Password</label>
                <input
                onChange={e => setPassword(e.target.value)}
                className="login--input" type="password" placeholder="Enter your password..." />
                <button className="login--btn" type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login