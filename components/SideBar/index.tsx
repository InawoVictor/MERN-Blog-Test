import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Category {
    name: string;
  // Add other properties based on the actual structure of your category
}

const SideBar: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        async function getCategories() {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
            setCategories(res.data);
        } catch (error) {
            console.error(error);
        }
        }

        getCategories();
    }, []);

    return (
        <div className="sidebar">
        <div className="sidebar--item">
            <span className="sidebar--title">ABOUT ME</span>
            <img
            src="https://images.pexels.com/photos/64769/pexels-photo-64769.jpeg"
            alt=""
            />
            <p>
            Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
            amet ex esse.Sunt eu ut nostrud id quis proident.
            </p>
        </div>
        <div className="sidebar--item">
            <span className="sidebar--title">CATEGORIES</span>
            <ul className="sidebar--list">
            {categories.map((c, index) => (
                <li className="sidebar--list-item" key={index}>
                <Link href={`/?category=${c?.name}`}>
                    <a className="link">{c?.name}</a>
                </Link>
                </li>
            ))}
            </ul>
        </div>
        <div className="sidebar--item">
            <span className="sidebar--title">FOLLOW US</span>
            <div className="sidebar--social">
            <i className="sidebar--icon fab fa-facebook-square"></i>
            <i className="sidebar--icon fab fa-instagram-square"></i>
            <i className="sidebar--icon fab fa-pinterest-square"></i>
            <i className="sidebar--icon fab fa-twitter-square"></i>
            </div>
        </div>
        </div>
    );
};

export default SideBar;
