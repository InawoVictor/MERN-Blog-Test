import Link from 'next/link';
import React from 'react';

interface PostProps {
  post: {
    photo: string;
    categories: string[];
    title: string;
    createdAt: string;
    description: string;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className='post'>
      <img src={post.photo} alt="Post Image" className='post--img' />
      <div className="post--info">
        <div className="post--info-categories">
          <span className="post--info-category">
            {post.categories && post.categories.map((c) => (
              <span className="postCat" key={c}>
                <Link href={`/posts?cat=${c}`}>
                  <a className="link">{c}</a>
                </Link>
              </span>
            ))}
          </span>
        </div>
        <div className="post--title">
          {post.title}
        </div>
        <hr />
        <span className='post--date'>{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className='post--description post--description-truncate'>
        {post.description.length > 40 ? (
          <span>{post.description.slice(0, 40)}...</span>
        ) : (
          <span>{post.description}</span>
        )}
      </p>
    </div>
  );
};

export default Post;
