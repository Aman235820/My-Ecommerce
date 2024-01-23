import React, { useContext, useEffect, useState } from 'react';
import AuthContext from "../context/AuthProvider";
import SideBar from './SideBar';
import Navbar from './Navbar';
import { GetProducts } from '../DataService';
import Products from './Products';
import { useDispatch, useSelector } from 'react-redux';

function Profile() {

    const dispatch = useDispatch();

    const { user, productCategory } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loader, setLoading] = useState(false);


    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await GetProducts(dispatch);
            setLoading(false);
        }
        fetchData();
    }, []);

    let productData = useSelector((state) => {
        return (state.allProducts).allProducts;
    });


    useEffect(() => {
        fetchSelectedProducts(productCategory);
    }, [productCategory , productData]);


    const fetchSelectedProducts = (category) => {
        setLoading(true);
        let res = productData;
       
        if (category == 2) {
            res = res.filter(item => item.category == "men's clothing");
        }
        else if (category == 3) {
            res = res.filter(item => item.category == "women's clothing");
        }
        else if (category == 4) {
            res = res.filter(item => item.category == "electronics")
        }
        else if(category==5){
            res = res.filter(item => !(item.category == "men's clothing" ||  item.category == "women's clothing" || item.category == "electronics" ))
        }

        setProducts(res);
        setLoading(false);
    }

    const openProductDetailsModal = ()=>{
           console.log("Modal opened");
    }


    return (
        <>
            <div className="dashboard-wrapper">
                <SideBar Name={user?.userData?.Name}
                    Age={user?.userData?.Age}
                    Gender={user?.userData?.Gender}
                    Pincode={user?.userData?.Pincode}
                ></SideBar>

                <div className='content-wrapper d-flex'>
                    <Navbar></Navbar>

                    <div className='loader m-auto'>
                        {
                            loader && (
                                <p className='m-0'>Loading...</p>
                            )
                        }

                        {!loader && <div className="row p-5 my-3">
                            {
                                products.map(item => {
                                    return (
                                        <div className="col-3 p-3">
                                            <Products key={item.id} title={item.title}
                                                image={item.image}
                                                desc={item.description}
                                                openProductDetailsModal = {openProductDetailsModal}
                                            ></Products>
                                        </div>)
                                })
                            }
                        </div>}
                    </div>
                </div>

            </div>
        </>
    );
}

export default Profile;