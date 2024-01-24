import { useDeletePostMutation, useGetPostQuery, useUpdatePostMutation } from '@/redux/posts/posts'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const SinglePost = ({post}) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [updateMode, setUpdateMode] = useState(false)

    const currentUser = useSelector(state => state.auth.user)
    const [updatePost] = useUpdatePostMutation();
    const [deletePost] = useDeletePostMutation();
    const router = useRouter()

    useEffect(() => {
        setTitle(post.title);
        setDescription(post.description);
    }, [])

    const handleUpdate = () => {
        // updatePost(
        //     {
        //         username: currentUser.username,
        //         id: post._id,
        //         title,
        //         description
        //     }
        // )        
        try {
            axios.put(`${process.env.NEXT_PUBLIC_API_URL}/posts/${post._id}`, {
                username: currentUser.username,
                id: post._id,
                title,
            })
            setUpdateMode(false)
            router.push("/")
            toast.success("Post has been updated 😎")
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        // deletePost(
        //     {
        //         username: currentUser.username,
        //         id: post._id,
        //     }
        // )
        
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/posts/${post._id}`,
            {data:{username: currentUser.username}})
            setUpdateMode(false)
            router.push("/")
            toast.success("Post has been deleted 😞")
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(currentUser)

  return (
    <div className='singlePost'>
        <div className="singlePost--wrapper">
            <img
                className="singlePost--img"
                src={"https://i.pinimg.com/originals/39/11/6c/39116c247669762f4ce72be4ce2b862e.jpg"}
                alt=""
            />
            {updateMode ? <input type="text" autoFocus={true} 
                onChange={(e) => setTitle(e.target.value)} placeholder='Edit Title'
                value={title} className="singlePost--title-input"/> :(
                    <h1 className="singlePost--title">
                        {post.title}
                        {post.username === currentUser?.username && (
                        <div className="singlePost--edit">
                            <i onClick={() => setUpdateMode(true)} className="singlePost--icon far fa-edit"></i>
                            <i onClick={handleDelete} className="singlePost--icon far fa-trash-alt"></i>
                        </div>
                        )}
                    </h1>
            )}

            <div className="singlePost--info">
                <span>
                    Author:
                    <b className="singlePost--author">
                    {post.username}
                    </b>
                </span>
                <span>{new Date(post.createdAt).toDateString()}</span>
            </div>

            {updateMode ?
                    <textarea autoFocus={true} className="singlePost--description-input" placeholder='Edit description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
                : (
                    <p className="singlePost--description">
                        {post.description}
                    </p>
                )
            }
            {updateMode && <button onClick={handleUpdate} className="singlePost--btn">Update</button>}
        </div>
    </div>
  )
}

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quasi.
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quasi.
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quasi.
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quasi.
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quasi.

export default SinglePost