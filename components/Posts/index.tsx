import React from 'react';
import Post from '../Post';
import Link from 'next/link';

interface PostsProps {
  posts: {
    _id: string;
    username: string;
    photo: string;
    categories: string[];
    title: string;
    createdAt: string;
    description: string;
  }[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  return (
    <div className='posts'>
      {posts?.map((item, index) => (
        <Link href={`/posts/${item._id}`} key={index}>
          <Post key={index} post={item} />
        </Link>
      ))}
    </div>
  );
};

export default Posts;
