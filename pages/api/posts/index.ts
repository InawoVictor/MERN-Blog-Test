import Post from '@/models/Post';
import connectDB from '@/utils/connectDB';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    connectDB();

    const { method, body, query } = req;
    
    //CREATE POST
    if (method === 'POST') {
        try {
            const post  = await Post.create(body)
            res.status(200).json(post)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    //GET ALL POSTS
    if(method === "GET") {
        const username = query.user;
        const categoryName = query.category;
        try {
            let posts;
            if(username){
                posts  = await Post.find({username})
            } else if (categoryName) {
                posts = await Post.find({categories: {
                    $in: [categoryName]
                }})
            } else {
                posts = await Post.find()
            }
            res.status(200).json(posts)
        } catch (error) {
            res.status(500).json(error)
        }
    }
};

export default handler;