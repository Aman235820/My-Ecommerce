import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../redux/slices/cartSlice";

export default function MyCart() {

    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [records , setRecords] = useState(data);

    const dispatch = useDispatch();

    const selectedProducts = useSelector((state) => (state.cartItems).cartArray);

    const email = user?.userData?.Email;

    useEffect(()=>{
        setRecords(data);
    },[data]);

    useEffect(() => {
        fetchAllProducts();
        console.log(selectedProducts);
    }, [selectedProducts]);

    const columns = [
        {
            name: "",
            selector: row => <img height="50px" width="50px" src={row.image} alt="img" />
        },
        {
            name: "Name",
            selector: row => row.name
        },
        {
            name: "Price",
            selector: row => row.price
        },
        {
            name: "Quantitiy",
            selector: row => row.quantity,
            sortable: true
        },
        {
            name : "Remove Items",
            selector : row => <img src="bin.png" height="20px" width="20px" alt="img" onClick={()=>deleteProduct(row.id , email)}/>
        }

    ];

   const deleteProduct = (id , emailID)=>{
        let index = selectedProducts.findIndex(obj=> obj.user == emailID && obj.product.id == id);
        dispatch(removeProduct(index));
   }

    const fetchAllProducts = () => {
        const cartProducts = selectedProducts.filter(item => item.user == email);

        const productData = cartProducts.map(mapProductsToData);

        function mapProductsToData(item) {
            let obj = {
                id : item.product.id,
                image: item.product.image,
                name: item.product.title,
                price: item.product.price,
                quantity: item.quantity
            }
            return obj;
        }
        setData(productData);
    }

    const searchItem = (e)=>{
         const searchItems = data.filter(item => {
               return item.name.toLowerCase().includes(e.target.value.toLowerCase());
         });
         setRecords(searchItems);
    }


    return (
        <>
            <div className="dashboard-wrapper">
                <SideBar style={{ position: "sticky", top: 0 }}
                    Name={user?.userData?.Name}
                    Age={user?.userData?.Age}
                    Gender={user?.userData?.Gender}
                    Pincode={user?.userData?.Pincode}
                ></SideBar>

                <div className='content-wrapper d-flex'>
                    <Navbar></Navbar>
                    <br /><br /><br />

                    <div className="ms-auto margin-auto">
                        <input type="text" onChange={searchItem}></input>
                    </div>
                    <DataTable

                        columns={columns}
                        data={records}
                        fixedHeader
                        pagination

                    />


                </div>

            </div>

        </>
    );
}