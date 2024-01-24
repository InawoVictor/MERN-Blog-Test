import { SideBar } from '@/components';
import { logOut, setCredentials } from '@/redux/auth/authSlice';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Profile = () => {
    const router = useRouter()

    const currentUser = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [file, setFile] = useState("")

    useEffect(() => {
        setEmail(currentUser.email)
        setUsername(currentUser.username)
        setPassword(currentUser.password)
    }, [])

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${currentUser._id}`, {
                data: {
                    userId: currentUser._id,
                    username: currentUser.username
                }
            }
            )
            toast.success(`user has been deleted`)
            router.push("/")
            dispatch(logOut())
        } catch (error) {
            console.log(error)
            toast.error(`${error.response.data}`)
        }
    }

    const updateUser = async (e) => {
        e.preventDefault()
        const updatedUser = {
            userId: currentUser._id,
            username,
            email,
        }     
        
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${currentUser._id}`,
                updatedUser
            )
            dispatch(setCredentials({ user: res.data}))
            router.push("/");
            toast.success(`user has been updated`)
          } catch (error) {
            console.log(error)
            toast.error(`${error.response.data}`)
          }
        
    }


    return (
        <div className="profile">
        <div className="profile--wrapper">
            <div className="profile--title">
            <span className="profile--title-update">Update Your Account</span>
            <span onClick={handleDelete} className="profile--title-delete">Delete Account</span>
            </div>
            <form className="profile--form" onSubmit={updateUser}>
            <label>Profile Picture</label>
            <div className="profile--PP">
                <img
                src={"https://images.pexels.com/photos/64769/pexels-photo-64769.jpeg"}
                alt=""
                />
                <label htmlFor="fileInput">
                <i className="profile--PP-icon far fa-user-circle"></i>{" "}
                </label>
                <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                className="profile--PP-input"
                onChange={(e) => setFile(e.target.files[0])}
                />
            </div>
            <label>Username</label>
            <input type="text" placeholder={currentUser?.username} name="name"
                onChange={e => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input type="email" placeholder={currentUser?.email} name="email"
                onChange={e => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input type="password" placeholder="password" name="password"
                onChange={e => setPassword(e.target.value)}
            />
            <button className="profile--submit-btn" type="submit">
                Update
            </button>
            {/* {success && <span style={{ color: "green", margin: "20px " }}>Profile updated..</span>} */}
            </form>
        </div>
        <SideBar />
        </div>
    )
}

export default Profile