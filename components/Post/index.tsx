import Link from 'next/link'
import React from 'react'

const Post = ({post}) => {
    return (
        <div className='post'>
            <img src={"https://i.pinimg.com/originals/39/11/6c/39116c247669762f4ce72be4ce2b862e.jpg"} alt="" className='post--img'/>
            <div className="post--info">
                <div className="post--info-categories">
                    <span className="post--info-category">
                    {post.categories && post.categories.map((c) => {
                        return <span className="postCat" key={c}>
                        <Link className="link" href={"/posts?cat=Music"}>
                            {c}
                        </Link>
                        </span>
                    })}
                    </span>
                </div>
                <div className="post--title">
                    {post.title}
                </div>
                <hr />
                <span className='post--date'>{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className='post--description'>
                {post.description}
            </p>
        </div>
    )
}

export default Post