import { SideBar } from '@/components';
import React, { useState } from 'react'

const Profile = () => {
    const handleDelete = () => {
        console.log("delete");
        
    }
    const handleSubmit = () => {
        console.log("delete");
    }

    const [currentUser, setCurrentUser] = useState({})
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [file, setFile] = useState("")

    return (
        <div className="profile">
        <div className="profile--wrapper">
            <div className="profile--title">
            <span className="profile--title-update">Update Your Account</span>
            <span onClick={handleDelete} className="profile--title-delete">Delete Account</span>
            </div>
            <form className="profile--form" onSubmit={handleSubmit}>
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
            <input type="text" placeholder={currentUser.username} name="name"
                onChange={e => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input type="email" placeholder={currentUser.email} name="email"
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