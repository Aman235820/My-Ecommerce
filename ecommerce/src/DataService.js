import axios from "axios";

export const GetData = async () => {
    try {
        const endpoint = `/json/Database.json`;
        const user = await axios.get(endpoint);
        return user;
    } catch (error) {
        console.log(error);
    }
}

export const GetProducts = async () => {
    try {
        let response =  await axios.get('https://fakestoreapi.com/products/');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}