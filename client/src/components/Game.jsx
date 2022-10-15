import { useEffect, useState } from "react"

export const Game=()=>{

    const [current,setCurrent]=useState(null)

    const handlePress=(e)=>{
        console.log(e)


        if(e.key.toLowerCase()!==e.key.toUpperCase()&&!current) {
        setCurrent(e.key)

        setTimeout(()=>{
            setCurrent(null)
        },5000)

    }
    }
    useEffect(()=>{

        window.addEventListener("keypress",handlePress);

        return ()=>window.removeEventListener("keypress",handlePress)
        
    })


    return <div className="flex bg-primary w-full min-h-screen">
        <div className="flex-[0.20] flex flex-col p-3 bg-black drop-shadow border-slate-700 border-r">
          
        </div>

        <div className="flex-[0.80] p-5">
            <h1 className="text-2xl text-secondary pb-20">Guess the Word</h1>
        

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

        {current&&<div className="duration-500 absolute right-[25px] bottom-[25px] uppercase font-[500] drop-shadow w-[60px] text-black text-xl flex justify-center items-center h-[60px] bg-yellow-400 rounded-md">{current}</div>}

    </div>
}

const LetterBox=({letter})=>{

    return <div className="w-[60px] h-[60px] bg-tertiary rounded-md">
        {letter}
    </div>
}