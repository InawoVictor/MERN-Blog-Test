import axios from "axios";
import { useEffect, useState } from "react"

const useFetch = async (url: string) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${url}`);   
            setData(res.data);
            console.log(data)         
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])
    
    const refetch = () => fetchData()

    return [ data, loading, error ];

} 

export default useFetch