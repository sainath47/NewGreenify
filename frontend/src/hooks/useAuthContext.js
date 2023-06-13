import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"


//here context is created out of workoutsContext & retruned with proper validation provided, thats it, we could have used workoutsContext directly instead of using this hook
export const useAuthContext = ()=> {
    const context  = useContext(AuthContext)

    if(!context ){
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }

    return context
}