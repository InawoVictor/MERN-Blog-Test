import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const PostCreation = () => {
    const currentUser = useSelector(state => state.auth.user)
    const router = useRouter()

    const [file, setFile] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newPost ={
            title: title,
            description: description,
            username: currentUser.username
        }

        try {
            if(title === ""){
                toast.error("Please enter a title")
            } else if (description === "") {
                toast.error("Please add your story")
            } else {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts`, newPost)
                router.push("/")
                toast.success("Your post has been created");
            }
            
        } catch (error) {
            console.log(error);
            toast.error("Opps! 😬, Something went wrong")
        }
    }

    return (
            <div className="creation">
                {file && <img
                    className="creation--img"
                    src={window.URL.createObjectURL(file)|| ''}   
                    alt=""
                />}
                <form className="creation--form" onSubmit={handleSubmit}>
                    <div className="creation--from-group">
                        <label htmlFor="fileInput">
                            <i className="creation--icon fas fa-plus"></i>
                        </label>
                        <input id="fileInput" type="file" style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                        />
                        <input
                            className="creation--input"
                            placeholder="Title"
                            type="text"
                            autoFocus={true}
                            // required
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="creation--form-group">
                    <textarea
                        className="creation--input creation--text"
                        placeholder="Tell your story..."
                        autoFocus={true}
                        onChange={e => setDescription(e.target.value)}
                    />
                    </div>
                    <button className="creation--submit" type="submit">
                        Publish
                    </button>
                </form>
            </div>
    )
}

export default PostCreation