import {Home} from "./Home"
import { Game } from "./Game"
import useSocket from "../hooks/useSocket"
export const Studio=()=>{

    const {socket,setSocket}=useSocket()
    return <div>
    {socket?<Game/>:<Home/>}
    </div>
}