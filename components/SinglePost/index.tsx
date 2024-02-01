import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

interface Post {
    title: string
    description: string
    username: string
    photo: string
    _id: string
    createdAt: string
}

interface SinglePostProps {
    post: Post; 
}

const SinglePost: React.FC<SinglePostProps>  = ({post}) => {
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [updateMode, setUpdateMode] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const currentUser = useSelector((state:any) => state.auth.user)
    const router = useRouter()

    useEffect(() => {
        setTitle(post.title);
        setDescription(post.description);
    }, [])

    const handleUpdate = () => {

        try {
            setLoading(true)
            axios.put(`${process.env.NEXT_PUBLIC_API_URL}/posts/${post._id}`, {
                username: currentUser.username,
                id: post._id,
                title,
            })
            setUpdateMode(false)
            router.push("/")
            toast.success("Post has been updated 😎")
            setLoading(false)
        } catch (error: any) {
            console.log(error)
            toast.error(error?.response.data)
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        
        try {
            setLoading(true)
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/posts/${post._id}`,
            {data:{username: currentUser.username}})
            setUpdateMode(false)
            router.push("/")
            toast.success("Post has been deleted 😞")
            setLoading(false)
        } catch (error: any) {
            console.log(error)
            toast.error(error?.response.data)
            setLoading(false)
        }
    }

    // console.log(currentUser)

  return (
    <div className='singlePost'>
        <div className="singlePost--wrapper">
            {post?.photo && (
                <Image
                className="singlePost--img"
                src={post.photo}
                alt=""
                />

            )}
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
                    <Link className="link" href={`/?user=${post.username}`}>
                        {post.username}
                    </Link>
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
            {updateMode && <button onClick={handleUpdate} disabled={loading} className="singlePost--btn">Update</button>}
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