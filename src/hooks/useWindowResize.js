import {useState, useEffect} from 'react'

const useWindowResize = () =>{
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    })

    useEffect(()=>{

        const handleresize = ()=>{
            setWindowSize({
                width:window.innerWidth,
                height: window.innerHeight
            })
        }
        handleresize();

        window.addEventListener("resize",handleresize);
        const cleanup = () =>{
            window.removeEventListener("resize",handleresize);
        }
        return cleanup;
    },[])

    return windowSize;
}
export default useWindowResize;