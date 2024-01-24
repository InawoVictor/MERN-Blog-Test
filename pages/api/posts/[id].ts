import connectDB from '@/utils/connectDB';
import { NextApiRequest, NextApiResponse } from 'next';
import Post from '@/models/Post';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    connectDB();

    const { method, query: {id}, body } = req;

    //GET POST
    if(method === "GET") {
        try {
            const post = await Post.findById(id)
            res.status(200).json(post)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    //UPDATE POST
    if(method === "PUT") {
        try {
            const post = await Post.findById(id)
            if(post.username === body.username) {
                try {
                    const updatedPost = await Post.findByIdAndUpdate(
                        id,
                        {
                            $set: body,
                        },
                        { new: true } // { new: true } returns the updated document
                    );
                    res.status(200).json(updatedPost)
                } catch (error) {
                    res.status(500).json(error);
                }
            } else {
                res.status(401).json("You can only update your own post")
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    //DELETE POST
    if(method === "DELETE") {
        try {
            const post = await Post.findById(id)
            if(post.username === body.username) {
                try {
                    await Post.findByIdAndDelete(id)
                    res.status(200).json("Post has been deleted")
                } catch (error) {
                    res.status(500).json(error);
                }
            } else {
                res.status(401).json("You can only update your own post")
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
};

export default handler;