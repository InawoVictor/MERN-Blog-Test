import React, { useState } from 'react'

const PostCreation = () => {

    const [file, setFile] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const handleSubmit = () => {
        console.log('submit')
    }

    return (
            <div className="creation">
                {file && <img
                    className="creation--img"
                    src={window.URL.createObjectURL(file)|| ''}   
                    alt=""
                />}
                <form className="creation--form" onSubmit={handleSubmit}>
                    <div className="creation--from-group">
                        <label htmlFor="fileInput">
                            <i className="creation--icon fas fa-plus"></i>
                        </label>
                        <input id="fileInput" type="file" style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                        />
                        <input
                            className="creation--input"
                            placeholder="Title"
                            type="text"
                            autoFocus={true}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="creation--form-group">
                    <textarea
                        className="creation--input creation--text"
                        placeholder="Tell your story..."
                        autoFocus={true}
                        onChange={e => setDescription(e.target.value)}
                    />
                    </div>
                    <button className="creation--submit" type="submit">
                        Publish
                    </button>
                </form>
            </div>
    )
}

export default PostCreation