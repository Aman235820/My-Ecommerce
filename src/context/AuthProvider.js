import { useState , createContext } from "react";

const AuthContext = createContext();

 export const AuthProvider = ({children})=>{
    
     const [status , setStatus] = useState(false);
     const[user , setUser] = useState({});
     const [productCategory , setProductCategory] = useState(1);

     return(
        <AuthContext.Provider value={{status , setStatus , user , setUser , productCategory , setProductCategory}}>
            {children}
        </AuthContext.Provider>
     );
}

export default AuthContext;