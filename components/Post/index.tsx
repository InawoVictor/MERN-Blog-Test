import React from 'react'

const Post = ({post}) => {
    return (
        <div className='post'>
            <img src={post.img} alt="" className='post--img'/>
            <div className="post--info">
                <div className="post--info-categories">
                    <span className="post--info-category">Posted on</span>
                </div>
                <div className="post--title">
                    {post.title}
                    {/* <span className="post--info-item-title">By</span>
                    <span className="post--info-item-author">Author</span> */}
                </div>
                <hr />
                <span className='post--date'>{post.date}</span>
            </div>
            <p className='post--description'>
                {post.description}
            </p>
        </div>
    )
}

export default Post