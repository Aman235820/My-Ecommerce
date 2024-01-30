import React, { useContext, useEffect, useState } from 'react';
import AuthContext from "../context/AuthProvider";
import SideBar from './SideBar';
import Navbar from './Navbar';
import { GetProducts } from '../DataService';
import Products from './Products';
import { useDispatch, useSelector } from 'react-redux';
import ProductModal from './modals/ProductModal';
import { addProduct } from '../redux/slices/cartSlice';

function Profile() {

    const dispatch = useDispatch();

    const { user, productCategory } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loader, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [productModalID, setProductModalID] = useState(null);
    const [userCart, setUserCart] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await GetProducts(dispatch);
            setLoading(false);
        }
        fetchData();
    }, []);

    const productData = useSelector((state) => {
        return (state.allProducts).allProducts;
    });

    let myCart = useSelector((state) => {
        return (state.cartItems).cartArray;
    });

    useEffect(() => {
        let cart = myCart.filter(item => item.user == user?.userData?.Email).map((item) => item.product);
        setUserCart(cart);
    }, [myCart]);


    useEffect(() => {
        fetchSelectedProducts(productCategory);
    }, [productCategory, productData]);



    const closeModal = () => { setShowModal(false); }



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
        else if (category == 5) {
            res = res.filter(item => !(item.category == "men's clothing" || item.category == "women's clothing" || item.category == "electronics"))
        }

        setProducts(res);
        setLoading(false);
    }


    const mainProductModal = (
        <ProductModal productId={productModalID} closeModal={closeModal}></ProductModal>
    );

    const openProductDetailsModal = (id) => {
        setProductModalID(id);
        setShowModal(true);
    }

    const addProductTocart = (id) => {
        const product = productData.filter(item => item.id == id);
        let cartObj = {
            "user": user?.userData?.Email,
            "product": product[0]
        }
        dispatch(addProduct(cartObj));
    }

    return (
        <>
            {showModal && mainProductModal}

            <div className="dashboard-wrapper">
                <SideBar style={{ position: "sticky", top: 0 }}
                    Name={user?.userData?.Name}
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
                                            <Products key={item.id}
                                                id={item.id}
                                                title={item.title}
                                                image={item.image}
                                                desc={item.description}
                                                openProductDetailsModal={openProductDetailsModal}
                                                addProductTocart={addProductTocart}
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