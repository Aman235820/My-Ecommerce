import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import DataTable from "react-data-table-component";
import ProfileModal from "./modals/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, updateProductQuantity } from "../redux/slices/cartSlice";
import { emptyUserCart } from "../redux/actions";
import ProceedToBuy from "./modals/ProceedtoBuyModal";

export default function MyCart() {

    const { user , showProfileModal } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [records, setRecords] = useState(data);
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    const selectedProducts = useSelector((state) => (state.cartItems).cartArray);

    const userEmailID = user?.userData?.Email;

    useEffect(() => {
        setRecords(data);
    }, [data]);

    useEffect(() => {
        fetchAllProducts();
    }, [selectedProducts, userEmailID]);

    const columns = [
        {
            name: "Item",
            selector: row => <p className="p-2 m-0"> <img height="50px" width="50px" src={row.image} alt="img" /></p>
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
            selector: row => <span><button className="btn btn-secondary" style={{ padding: '0 8px' }} onClick={() => addProduct(row.id)}>+</button> {row.quantity} <button className="btn  btn-secondary" style={{ padding: '0 9px' }} onClick={() => deleteProduct(row.id)}>-</button></span>,
        },
        {
            name: "Amount",
            selector: row => "₹" + row.amount,
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
                uniqueId:crypto.randomUUID(),
                id: item.product.id,
                image: item.product.image,
                name: item.product.title,
                price: item.product.price,
                quantity: item.quantity,
                category: item.product.category,
                amount: (Math.round((item.quantity * item.product.price) * 100) / 100).toFixed(2)
            }
            return obj;
        }
        setData(productData);
    }

    const EraseCartItems = () => {
        dispatch(emptyUserCart(userEmailID));
    }

    const filterProductsOnSearch = (value) => {
        const searchItems = data.filter(item => {
            return item.name.toLowerCase().includes(value.toLowerCase());
        });
        setRecords(searchItems);
    }


    const OpenProceedToBuyModal = () => {
        setShowModal(true);
    }

    const closeProccedtoBuyModal = () => {
        setShowModal(false);
    }

    const proceedToBuy = (<>
        <ProceedToBuy productDetails={data}
            closeProccedtoBuyModal={closeProccedtoBuyModal}
            userEmailID={userEmailID}
        ></ProceedToBuy>
    </>);



    return (
        <>

            {showModal && proceedToBuy}
            {showProfileModal && <ProfileModal></ProfileModal>}
            
    
                    <Navbar filterProductsOnSearch = {filterProductsOnSearch}/>
                     <br/> <br/> <br/>
                    <div className="table-wrapper">
                        <DataTable
                            columns={columns}
                            data={records}
                            fixedHeader
                            pagination
                        />
                    </div>
                    {data && data.length != 0 && (<div className="justify-content-end">
                        <button className="btn btn-danger btn-info justify-content-end" onClick={EraseCartItems}>Clear Cart</button>
                        <button className="btn btn-info m-3" onClick={OpenProceedToBuyModal}>Procced To Buy</button>
                    </div>)}
          

        </>
    );
}