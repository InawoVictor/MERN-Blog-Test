import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, SyntheticEvent } from 'react';
import { toast } from 'react-toastify';

const Register: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsFetching(true);
        try {
            if (username === '') {
                toast.error('Please enter a username');
            } else if (password === '') {
                toast.error('Please enter a password');
            } else if (email === '') {
                toast.error('Please enter a valid email');
            } else {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                username,
                password,
                email,
                });
                setIsFetching(false);
                toast.success('User has been registered successfully 😎');
                router.push('/login');
            }
        } catch (error) {
            console.log(error);
            setError(true);
            setIsFetching(false);
        }
    };

    return (
        <div className="register">
        <span className="register--title">Register</span>
        <form className="register--form" onSubmit={handleSubmit}>
            <label>Username</label>
            <input
            onChange={(e) => setUsername(e.target.value)}
            className="register--input"
            type="text"
            placeholder="Enter your username..."
            />
            <label>Email</label>
            <input
            onChange={(e) => setEmail(e.target.value)}
            className="register--input"
            type="text"
            placeholder="Enter your email..."
            />
            <label>Password</label>
            <input
            onChange={(e) => setPassword(e.target.value)}
            className="register--input"
            type="password"
            placeholder="Enter your password..."
            />
            <button className="register--btn">Register</button>
        </form>
        {error && <span style={{ color: 'red', marginTop: '10px' }}>Something went wrong!</span>}
        </div>
    );
};

export default Register;
