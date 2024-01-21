import React from 'react'

const SinglePost = () => {
    const handleUpdate = () => {
        console.log('update')
    }

  return (
    <div className='singlePost'>
        <div className="singlePost--wrapper">
            <img
                className="singlePost--img"
                src={"https://i.pinimg.com/originals/39/11/6c/39116c247669762f4ce72be4ce2b862e.jpg"}
                alt=""
            />
            <h1 className="singlePost--title">
            Living A Healthy Life
            {/* {post.username === currentUser?.username && (
            <div className="singlePostEdit">
                <i onClick={() => setUpdateMode(true)} className="singlePostIcon far fa-edit"></i>
                <i onClick={handleDelete} className="singlePostIcon far fa-trash-alt"></i>
            </div>
            )} */}
            </h1>

            <div className="singlePost--info">
                <span>
                    Author:
                    <b className="singlePost--author">
                    James Kenzo
                    </b>
                </span>
                <span>20-04-1988</span>
            </div>

            <p className="singlePost--description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quasi.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quasi.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quasi.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quasi.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quasi.
            </p>
            <button onClick={handleUpdate} className="singlePost--btn">Update</button>
        </div>
    </div>
  )
}

export default SinglePost