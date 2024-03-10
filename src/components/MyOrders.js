import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function MyOrders(){
      const myOrders = useSelector((state)=>{
           return state.masterData.placedOrders;
      });

      const [orderList , setOrdersList] = useState([]);

      useEffect(()=>{
           setMyOrdersData();
      },[myOrders]);

      const setMyOrdersData = ()=>{
             if(myOrders){
                   setOrdersList(myOrders[0]?.articles);
             }
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


      return(

        <>
                <div className="dashboard-wrapper">
                <div className='content-wrapper d-flex'>
                    <Navbar></Navbar>
        
                <DataTable
                      data={orderList}
                      columns={columns}
                      pagination
                />

                </div>
                </div>

        </>

      );
}
