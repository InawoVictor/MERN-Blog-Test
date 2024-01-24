import { NextApiRequest, NextApiResponse } from 'next';
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import bcrypt from "bcryptjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {    
    connectDB()

    const { method, body } = req    
    if(method === "POST") {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = bcrypt.hashSync(body.password, salt);
            const newUser = new User({
                username: body.username,
                password: hashedPassword,
                email: body.email,
            });
    
            const user = await newUser.save();
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

export default handler;