import { SideBar, SinglePost } from '@/components';
import { NextSeo } from 'next-seo';
import axios from 'axios';
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Post } from '@/redux/posts/postTypes';
import Navbar from '@/components/Navbar';

interface PostDetailsProps {
  post: Post;
}

const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
  return (
    <>
      <NextSeo
        title={post.title}
        description={post.description}
        openGraph={{
          url: post.photo,
          title: `${post.title}`,
          description: `${post.description}`,
          images: [
            {
              url: post.photo,
              alt: 'Blog Image',
              type: 'image/jpeg',
            },
          ],
          siteName: 'IVblog',
        }}
      />
      <Navbar />
      <main className='postDetails'>
        <SinglePost post={post ?? []} />
        <SideBar />
      </main>
    </>
  );
};

export default PostDetails;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`);

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

export const getStaticProps: GetStaticProps<PostDetailsProps> = async (context) => {
  const id = context.params.id;
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);

  return {
    props: {
      post: res.data,
    },
  };
};

