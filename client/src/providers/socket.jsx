import { createContext, useState } from "react";
export const SocketContext=createContext();

export default SocketProvider=({children})=>{

    const [socket,setSocket]=useState(null)


    return <SocketContext.Provider value={{socket,setSocket}}>
    {children}
    </SocketContext.Provider>


}

