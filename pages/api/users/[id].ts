import connectDB from '@/utils/connectDB';
import User from '@/models/User';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import Post from '@/models/Post';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    connectDB();

    const { method, query: {id}, body } = req;

    //UPDATE USER
    if (method === 'PUT') {
        if (body.userId === id) {
            if (body.password) {
                const salt = await bcrypt.genSalt(10);
                body.password = bcrypt.hashSync(body.password, salt);
            }
            try {
                const updatedUser = await User.findByIdAndUpdate(
                id,
                {
                    $set: body,
                },
                { new: true } // { new: true } returns the updated document
                );

                if (updatedUser) {
                    res.status(200).json(updatedUser);
                } else {
                    res.status(404).json('User not found');
                }
            } catch (error) {
                res.status(500).json(error);
            }
        } else {
        res.status(401).json('You can only update your account');
        }
    }

    //DELETE USER
    if (method === 'DELETE') {
        if (body.userId === id) {
            try {
                const user = await User.findById(id)
                try {
                    await Post.deleteMany({username: user.username})
                    await User.findByIdAndDelete(id)
                    res.status(200).json("User has been deleted");
    
                } catch (error) {
                    res.status(500).json(error);
                }
            } catch (error) {
                res.status(404).json("User not found")
            }
        } else {
        res.status(401).json('You can only delete your account');
        }
    }

    //GET USER
    if (method === 'GET') {
        try {
            const user = await User.findById(id)
            const {password, ...others} = user._doc
            res.status(200).json(others)
        } catch (error) {
            res.status(404).json(error)
        }
    } 
};

export default handler;
