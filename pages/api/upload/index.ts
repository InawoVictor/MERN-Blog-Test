import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/public');
    },
    filename: (req, file, cb) => {
        cb(null, " hello .body"); 
    },
});

const upload = multer({ storage: storage });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req

    if(method === "POST") {
        try {
            await new Promise((resolve, reject) => {
                upload.single('file')(req, res, (error) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(null);
                });
            });
    
            res.status(200).json( 'File uploaded successfully' );
            console.error(' uploading file:', req.body);
        } catch (error) {
            console.error('Error uploading file:', error);
            res.status(500).json(error);
        }
    }
};

export const config = {
    api: {
        bodyParser: false, 
    },
};

export default handler;

