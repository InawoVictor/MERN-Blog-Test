import { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp } from "firebase/app";
import multer from 'multer';
import {firebaseConfig} from "@/config/firebase.config"
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/public');
    },
    filename: (req, file, cb) => {
        cb(null, " hello .body"); 
    },
});

const upload = multer({ storage: multer.memoryStorage()});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    initializeApp(firebaseConfig)
    const storage = getStorage()

    const { method } = req

    if(method === "POST") {
        try {
            // const dateTime = getCurrentDateTime()
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

