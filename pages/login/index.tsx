import { setCredentials } from '@/redux/auth/authSlice';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        username,
        password,
      });
      const { token, ...others } = res.data;
      dispatch(setCredentials({ accessToken: token, user: others }));
      router.push("/");
      toast.success("Logged in successfully 😊");
      setLoading(false)
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400) {
        toast.error("Invalid credentials 😞");
      }
      setLoading(false)
    }
  };

  return (
    <div>
      <div className="login">
        <h1 className="login--title">Login</h1>
        <form className="login--form" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="login--input"
            type="text"
            placeholder="Enter your email..."
          />
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="login--input"
            type="password"
            placeholder="Enter your password..."
          />
          <button className="login--btn" type="submit" disabled={loading}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
