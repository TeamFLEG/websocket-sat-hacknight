import {useContext} from "react"

import { SocketContext } from "../providers/socket"

const useSocket=()=>useContext(SocketContext);


export default useSocket;