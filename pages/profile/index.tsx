import { SideBar } from '@/components';
import { logOut, setCredentials } from '@/redux/auth/authSlice';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Navbar from '@/components/Navbar';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { analytics } from '@/config/firebase.config';

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
    const router = useRouter();

    const currentUser = useSelector((state: any) => state.auth.user);
    const token = useSelector((state: any) => state.auth.token);
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        setEmail(currentUser?.email);
        setUsername(currentUser?.username);
        setPassword(currentUser?.password);

        if (!token) {
        router.push('/login');
        }
    }, [token]);

    const handleDelete = async () => {
        try {
            
        const res = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${currentUser._id}`,
            {
            data: {
                userId: currentUser._id,
                username: currentUser.username,
            },
            }
        );
        toast.success(`user has been deleted`);
        router.push("/");
        dispatch(logOut());
        } catch (error: any) {
        console.log(error);
        toast.error(`${error.response.data}`);
        }
    };

    const updateUser = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedUser = {
        userId: currentUser._id,
        username,
        email,
        profilePicture: ""
        };

        if (file) {
            // const data = new FormData();
            // const filename = Date.now() + file.name;
            // data.append('name', filename);
            // data.append('file', file);
    
            
    
            try {
                const fileRef = ref(analytics, 'newfiles/notes');
                uploadBytes(fileRef, file).then((data) => {
                getDownloadURL(data.ref).then((url) => {
                    console.log('url', url)
                    updatedUser.profilePicture = url;
                });
                });
            } catch (error) {
                console.log(error);
            }
        }
        try {
        const res = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${currentUser._id}`,
            updatedUser
        );
        dispatch(setCredentials({ user: res.data }));
        router.push("/login");
        toast.success(`user has been updated`);
        } catch (error: any) {
        console.log(error);
        toast.error(`${error.response.data}`);
        }
    };

    return (
        <>
        <Navbar />
        <div className="profile">
            <div className="profile--wrapper">
            <div className="profile--title">
                <span className="profile--title-update">Update Your Account</span>
                <span onClick={handleDelete} className="profile--title-delete">
                Delete Account
                </span>
            </div>
            <form className="profile--form" onSubmit={updateUser}>
                <label>Profile Picture</label>
                <div className="profile--PP">
                <img
                    src={currentUser?.profilePic}
                    alt="Profile Image"
                />
                <label htmlFor="fileInput">
                    <i className="profile--PP-icon far fa-user-circle"></i>{" "}
                </label>
                <input
                    id="fileInput"
                    type="file"
                    style={{ display: "none" }}
                    className="profile--PP-input"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                />
                </div>
                <label>Username</label>
                <input
                type="text"
                placeholder={currentUser?.username}
                name="name"
                onChange={(e) => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input
                type="email"
                placeholder={currentUser?.email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                type="password"
                placeholder="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                />
                <button className="profile--submit-btn" type="submit">
                Update
                </button>
            </form>
            </div>
            <SideBar />
        </div>
        </>
    );
};

export default Profile;
