import connectDB from '@/utils/connectDB';
import User from '@/models/User';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    connectDB();

    const { method, body } = req;
    if (method === 'POST') {
        try {
        const user = await User.findOne({ username: body.username });

        if (!user) {
            return res.status(400).json('Wrong credentials');
        }

        const validated: boolean = await bcrypt.compare(body.password, user.password);

        if (!validated) {
            return res.status(400).json('Wrong credentials');
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string)

        const { password, ...others } = user._doc;
        return res
        .status(200).json({...others, token});
        } catch (error) {
        return res.status(500).json(error);
        }
    }
};

export default handler;
