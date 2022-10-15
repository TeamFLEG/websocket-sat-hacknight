import { useEffect, useState } from "react"
export const Game=()=>{

    const [show,setShow]=useState(false)

    const handlePress=(e)=>{
        console.log(e)
        setShow(true)

    }
    useEffect(()=>{

        window.addEventListener("onkeypress",handlePress);

        return ()=>window.removeEventListener("keypress",handlePress)
        
    },[])


    return <div className="flex bg-primary w-full min-h-screen">
        <div className="flex-[0.20] flex flex-col p-3 bg-black drop-shadow border-slate-700 border-r">
          
        </div>

        <div className="flex-[0.80] p-5">
            <h1 className="text-xl text-secondary pb-20">Guess the Word</h1>
        

        <div className="flex space-x-3 cursor-pointer">
            <LetterBox/>
            <LetterBox/>
            <LetterBox/>
            <LetterBox/>
            <LetterBox/>
            <LetterBox/>
            <LetterBox/>
            <LetterBox/>
        </div>
        </div>  

    </div>
}

const LetterBox=()=>{

    return <div className="w-[60px] h-[60px] bg-tertiary rounded-md">

    </div>
}