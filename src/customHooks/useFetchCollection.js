import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebase/Config";

const useFetchCollection = (collectionName) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getCollection = () => {
        setIsLoading(true)
        try {
            const docRef = collection(db, collectionName);
            const q = query(docRef, orderBy("createdAT", "desc"));
            onSnapshot(q, (snapshot) => {
                //console.log(snapshot)
                const allData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                //console.log(allData)
                setData(allData)
                setIsLoading(false)

            });
        } catch (error) {
            setIsLoading(false)
            toast.error(error.message)
        }
    };

    useEffect(() => {
        getCollection()
    }, [])

    return { data, isLoading }
}
export default useFetchCollection