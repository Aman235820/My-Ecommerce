import React, { useContext, useEffect, useState } from 'react';
import AuthContext from "../context/AuthProvider";
import SideBar from './SideBar';
import Navbar from './Navbar';
import { GetProducts } from '../DataService';
import Products from './Products';
import { useDispatch, useSelector } from 'react-redux';
import ProductModal from './modals/ProductModal';
import ProfileModal from './modals/ProfileModal';
import { addProduct, updateProductQuantity, removeProduct } from '../redux/slices/cartSlice';
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from '../redux/slices/masterSlice';
import { Link } from 'react-router-dom';

function Profile() {

    const dispatch = useDispatch();

    const { user , showProfileModal } = useContext(AuthContext);
    const [productCategory, setProductCategory] = useState(1);
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [productModalID, setProductModalID] = useState(null);
    const [userCart, setUserCart] = useState(null);

    const userEmailID = user?.userData?.Email;

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["products"],
        queryFn: GetProducts,            //fetching the API data through an asynchronous call
    });

    const productData = useSelector((state) => {
        return (state.masterData).allProducts;
    });

    let myCart = useSelector((state) => {
        return (state.cartItems).cartArray;
    });

    useEffect(() => {
        if (data) {
            dispatch(getAllProducts(data));
        }
    }, [data, dispatch]);

    useEffect(() => {
        let cart = myCart.filter(item => item.user == userEmailID).map((item) => ({ product: item.product, quantity: Number(item.quantity) }));
        setUserCart(cart);
    }, [myCart , userEmailID]);


    useEffect(() => {
        fetchSelectedProducts(productCategory);
    }, [productCategory, productData]);


    const closeModal = () => { setShowModal(false); }

    const fetchSelectedProducts = (category) => {
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
    }


    const mainProductModal = (
        <ProductModal productId={productModalID} closeModal={closeModal}></ProductModal>
    );

    const openProductDetailsModal = (id) => {
        setProductModalID(id);
        setShowModal(true);
    }

    const addProductTocart = (id) => {

        let quantity = Number(userCart.filter(item => item.product.id == id).map(item => item.quantity));
        quantity = quantity == 0 || quantity == null ? Number(1) : quantity + 1;

        if (quantity > 1) {
            dispatch(updateProductQuantity({ quantity, id, userEmailID }));
        }
        else {
            const itemToAdd = productData.filter(item => item.id == id);
            let cartObj = {
                "user": userEmailID,
                "product": itemToAdd[0],
                "quantity": 1
            }
            dispatch(addProduct(cartObj));
        }
    }

    const removeProductFromCart = (id) => {
        let index = myCart.findIndex(obj => obj.user == userEmailID && obj.product.id == id);
        dispatch(removeProduct(index));
    }

    const deleteProduct = (id) => {
        let quantity = Number(userCart.filter(item => item.product.id == id).map(item => item.quantity));
        quantity = quantity > 1 ? Number(quantity - 1) : 0;
        if (quantity == 0) {
            removeProductFromCart(id);
        }
        else {
            dispatch(updateProductQuantity({ quantity, id, userEmailID }));
        }
    }

    return (
        <>
            {showModal && mainProductModal}

            {showProfileModal && <ProfileModal></ProfileModal>}


            <div className='content-wrapper d-flex'>



                <header className="d-flex justify-content-center py-3">
                    <Navbar />
                </header>

                <div className='loader m-auto'>
                    {
                        isLoading && (
                            <p className='m-0'><img src='loader.gif' width={60} height={60} alt='Loading...' /></p>
                        )
                    }

                    {!isLoading &&  <div className='products-inner'>
                    
                        <div className="row p-5 my-2">

                            <div className='category-header mt-0 mb-3 p-0'>
                                <ul className="nav nav-pills d-flex justify-content-center">
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/profile" onClick={() => { setProductCategory(1) }}>All Articles</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/profile" onClick={() => { setProductCategory(2) }}>Men's</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/profile" onClick={() => { setProductCategory(3) }}>Women's</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/profile" onClick={() => { setProductCategory(4) }}>Electronics</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/profile" onClick={() => { setProductCategory(5) }}>Others</Link>
                                    </li>
                                </ul>
                            </div>

                            {
                                products.map(item => {
                                    return (
                                        <div className="col-md-3 p-3" key={item.id}>
                                            <Products key={item.id}
                                                id={item.id}
                                                title={item.title}
                                                image={item.image}
                                                desc={item.description}
                                                quantity={userCart.filter(obj => obj.product.id == item.id).map(obj => Number(obj.quantity))}
                                                openProductDetailsModal={openProductDetailsModal}
                                                addProductTocart={addProductTocart}
                                                deleteProduct={deleteProduct}
                                            ></Products>
                                        </div>)
                                })
                            }
                        </div>
                        
                    </div>
                    }
                </div>
            </div>

            {!isLoading && (<footer>
                <SideBar style={{ position: "sticky", bottom: 0 }}
                    Name={user?.userData?.Name}
                    Age={user?.userData?.Age}
                    Gender={user?.userData?.Gender}
                    Pincode={user?.userData?.Pincode}
                ></SideBar>
            </footer>)}
        </>
    );
}

export default Profile;