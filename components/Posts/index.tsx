import React from 'react'
// import {posts} from "@/utils/data"
import Post from '../Post'
import Link from 'next/link';

const Posts = ({posts}) => {

  
  return (
    <div className='posts'>
        {
            posts?.map((item, index) => {
                return (
                  <Link href={`/posts/${item._id}`} key={index}>
                    <Post key={index} post={item} />
                  </Link>
                )
            })
        }
        
    </div>
  )
}

export default Posts