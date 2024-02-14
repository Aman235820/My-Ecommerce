import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, updateProductQuantity } from "../redux/slices/cartSlice";
import { emptyUserCart } from "../redux/actions";

export default function MyCart() {

    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [records, setRecords] = useState(data);

    const dispatch = useDispatch();

    const selectedProducts = useSelector((state) => (state.cartItems).cartArray);

    const userEmailID = user?.userData?.Email;

    useEffect(() => {
        setRecords(data);
    }, [data]);

    useEffect(() => {
        fetchAllProducts();
    }, [selectedProducts]);

    const columns = [
        {
            name: "Item",
            selector: row => <img height="50px" width="50px" src={row.image} alt="img" />
        },
        {
            name: "Name",
            selector: row => row.name
        },
        {
            name: "Price",
            selector: row => <span>₹{row.price}</span>
        },
        {
            name: "Quantitiy",
            selector: row => <span><button className="btn btn-secondary" style={{ padding: '0 8px' }} onClick={() => addProduct(row.id)}>+</button>{row.quantity}<button className="btn  btn-secondary" style={{ padding: '0 9px' }} onClick={() => deleteProduct(row.id)}>-</button></span>,
            sortable: true
        },
        {
            name: "Amount",
            selector: row => <span>₹{(Math.round((row.quantity * row.price) * 100) / 100).toFixed(2)}</span>,
            sortable: true
        },
        {
            name: "Remove Items",
            selector: row => <img src="bin.png" height="20px" width="20px" alt="img" onClick={() => removeProductFromCart(row.id)} />
        }

    ];

    const addProduct = (id) => {
        let quantity = Number(selectedProducts.filter(item => item.product.id == id).map(item => item.quantity));
        quantity = quantity == 0 || quantity == null ? Number(1) : quantity + 1;
        dispatch(updateProductQuantity({ quantity, id, userEmailID }));
    }

    const removeProductFromCart = (id) => {
        let index = selectedProducts.findIndex(obj => obj.user == userEmailID && obj.product.id == id);
        dispatch(removeProduct(index));
    }

    const deleteProduct = (id) => {
        let quantity = Number(selectedProducts.filter(item => item.user == userEmailID && item.product.id == id).map(item => item.quantity));
        quantity = quantity > 1 ? Number(quantity - 1) : 0;
        if (quantity == 0) {
            removeProductFromCart(id);
        }
        else {
            dispatch(updateProductQuantity({ quantity, id, userEmailID }));
        }
    }

    const fetchAllProducts = () => {
        const cartProducts = selectedProducts.filter(item => item.user == userEmailID);
        const productData = cartProducts.map(mapProductsToData);
        function mapProductsToData(item) {
            let obj = {
                id: item.product.id,
                image: item.product.image,
                name: item.product.title,
                price: item.product.price,
                quantity: item.quantity
            }
            return obj;
        }
        setData(productData);
    }

    const EraseCartItems = () => {
        console.log("Aman");
        dispatch(emptyUserCart(userEmailID));
    }

    const searchItem = (e) => {
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
                    {data && data.length != 0 && (<div className="justify-content-end">
                        <button className="btn btn-danger w-25 justify-content-end" onClick={EraseCartItems}>Clear Cart</button>
                    </div>)}
                </div>
            </div>

        </>
    );
}