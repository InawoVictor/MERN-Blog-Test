import { SideBar, SinglePost } from '@/components'
import axios from 'axios'
import React from 'react'
import {Post} from "@/redux/posts/postTypes"

const PostDetails = ({post}) => {

  return (
    <>
        <main className='postDetails'>
          <SinglePost post={post ?? []}/>
          <SideBar />
        </main>
    </>
  )
}

export default PostDetails

export const getStaticPaths = async () => {
const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`)

const paths = (res.data as Post[]).map((post: Post) => {
  return {
    params: {
      id: post._id.toString(),
    },
  };
});

  return {
    paths,
    fallback: false, 
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`)

  return {
    props: {
      post: res.data,
    },
  }
}
