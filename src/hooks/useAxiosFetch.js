import { useState,useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (urldata) =>{
    const [data,setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        let isMounted= true;
        setIsLoading(true);
        const source = axios.CancelToken.source();

        const fetchData =async(url)=>{
            setIsLoading(true);
            try{
                const response=await axios.get(url,{
                    cancelToken: source.token
                });
                if(isMounted){
                    setData(response.data);
                    setFetchError(null);
                }
            }catch(err){
                if(isMounted){
                    setFetchError(err.message);
                    setData([]);
                }
            }finally{
                if(isMounted){
                 setIsLoading(false);
                }
            }
        }

        fetchData(urldata);

        const cleanup = ()=>{
            isMounted=false;
            source.cancel();
        }
        return cleanup;
    },[urldata]);
    return {data,isLoading,fetchError};
}

export default useAxiosFetch;