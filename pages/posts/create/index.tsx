import Navbar from '@/components/Navbar';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { analytics } from '@/config/firebase.config';

interface PostCreationProps {}

const PostCreation: React.FC<PostCreationProps> = () => {
    const currentUser: any = useSelector((state) => state.auth.user);
    const token: string | null = useSelector((state) => state.auth.token);

    const router = useRouter();

    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [url, setUrl] = useState<string>('');

    useEffect(() => {
        if (!token) {
        router.push('/login');
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newPost = {
        title: title,
        description: description,
        username: currentUser.username,
        };


        try {
        if (title === '') {
            toast.error('Please enter a title');
        } else if (description === '') {
            toast.error('Please add your story');
        } else {
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
                        newPost.photo = url;
                    });
                    });
                } catch (error) {
                    console.log(error);
                }
            }
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts`, newPost);
            router.push('/');
            toast.success('Your post has been created');
        }
        } catch (error) {
        console.log(error);
        toast.error('Opps! 😬, Something went wrong');
        }
    };

    return (
        <>
        <Navbar />
        <div className='creation'>
            {file && (
            <img
                className='creation--img'
                src={window.URL.createObjectURL(file) || ''}
                alt=''
            />
            )}
            <form className='creation--form' onSubmit={handleSubmit}>
            <div className='creation--from-group'>
                <label htmlFor='fileInput'>
                <i className='creation--icon fas fa-plus'></i>
                </label>
                <input
                id='fileInput'
                type='file'
                style={{ display: 'none' }}
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                />
                <input
                className='creation--input'
                placeholder='Title'
                type='text'
                autoFocus={true}
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className='creation--form-group'>
                <textarea
                className='creation--input creation--text'
                placeholder='Tell your story...'
                autoFocus={true}
                onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button className='creation--submit' type='submit'>
                Publish
            </button>
            </form>
        </div>
        </>
    );
};

export default PostCreation;
