import { SideBar, SinglePost } from '@/components'
import React from 'react'

const PostDetails = () => {
  return (
    <>
        <main className='postDetails'>
            <SinglePost />
            <SideBar />
        </main>
    </>
  )
}

export default PostDetails