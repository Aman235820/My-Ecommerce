import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import ProfileModal from "./modals/ProfileModal";
import AuthContext from "../context/AuthProvider";

export default function MyOrders() {
    const myOrders = useSelector((state) => {
        return state.masterData.placedOrders;
    });

    const [orderList, setOrdersList] = useState([]);
    const [searchList , setSearchList] = useState(orderList);
    const {showProfileModal} = useContext(AuthContext);

    useEffect(() => {
        setMyOrdersData();
    }, [myOrders]);

    useEffect(()=>{
        setSearchList(orderList);
    },[orderList]);

    const setMyOrdersData = () => {
        if (myOrders) {
            const orderedItems = myOrders.map((obj) => {
                return obj.articles;
            })
            setOrdersList(orderedItems.flat(1));
        }
    }

    const filterProductsOnSearch = (value) => {
        const searchItems = orderList.filter(item => {
            return item.name.toLowerCase().includes(value.toLowerCase());
        });
        setSearchList(searchItems);
    }

    const columns = [
        {
            name: "Item",
            selector: row => <p className="p-2 m-0"> <img height="50px" width="50px" src={row.image} alt="img" /></p>
        },
        {
            name: "Name",
            selector: row => <span>{row.name}</span>
        },
        {
            name: "Price",
            selector: row => <span>₹{row.price}</span>
        },
        {
            name: "Quantitiy",
            selector: row => <span>{row.quantity}</span>,
            sortable: true
        },
        {
            name: "Amount",
            selector: row => <span>₹{row.amount}</span>,
            sortable: true
        }
    ];


    return (

        <>

            {showProfileModal && <ProfileModal></ProfileModal>}


            <header className="d-flex justify-content-center py-3">
                <Navbar filterProductsOnSearch = {filterProductsOnSearch}/>
                <br /><br />
            </header>
            <div className="table-wrapper">
                <DataTable
                    data={searchList}
                    columns={columns}
                    pagination
                    fixedHeader
                />
            </div>

        </>

    );
}
