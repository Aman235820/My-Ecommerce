import axios from "axios";

export const GetData = async ()=>{
    try{
        const endpoint = `/json/Database.json`;
        const user = await axios.get(endpoint);
        return user;
    }catch(error){
         console.log(error);
    }
}