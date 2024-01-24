import Category from '@/models/Category';
import connectDB from '@/utils/connectDB';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    connectDB();

    const { method, body, query } = req;
    
    //CREATE CATEGORY
    if (method === 'POST') {
        try {
            const category  = await Category.create(body)
            res.status(200).json(category)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    //GET ALL CATEGORIES
    if (method === 'GET') {
        try {
            const categories  = await Category.find()
            res.status(200).json(categories)
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
};

export default handler;