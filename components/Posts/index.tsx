import React from 'react'
import {posts} from "@/utils/data"
import Post from '../Post'

const Posts = () => {
  return (
    <div className='posts'>
        {
            posts.map((item, index) => {
                return <Post key={index} post={item} />
            })
        }
    </div>
  )
}

export default Posts