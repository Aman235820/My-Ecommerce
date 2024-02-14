import axios from "axios";
import { getAllProducts } from "./redux/slices/masterSlice";

export const GetData = async ()=>{
    try{
        const endpoint = `/json/Database.json`;
        const user = await axios.get(endpoint);
        return user;
    }catch(error){
         console.log(error);
    }
}

export const GetProducts = async (dispatcher)=>{
     try{
          const endpoint = "https://fakestoreapi.com/products/";
          let res = await axios.get(endpoint);

          if(res && res.data){
                 (res.data).map(item=> {item.price = (Math.round(((item.price) * 83)*100)/100).toFixed(2)});
                 dispatcher(getAllProducts(res.data));
          }
          else{
               throw Error("Products not found");
          }
     }
     catch(error){
        console.error(error);
     }
}