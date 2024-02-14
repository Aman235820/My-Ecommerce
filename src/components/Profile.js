import React, { useContext, useEffect, useState } from 'react';
import AuthContext from "../context/AuthProvider";
import SideBar from './SideBar';
import Navbar from './Navbar';
import { GetProducts } from '../DataService';
import Products from './Products';
import { useDispatch, useSelector } from 'react-redux';
import ProductModal from './modals/ProductModal';
import { addProduct, updateProductQuantity , removeProduct } from '../redux/slices/cartSlice';

function Profile() {

    const dispatch = useDispatch();

    const { user, productCategory } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loader, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [productModalID, setProductModalID] = useState(null);
    const [userCart, setUserCart] = useState(null);

    const userEmailID = user?.userData?.Email;

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
        let cart = myCart.filter(item => item.user == userEmailID).map((item) => ({ product: item.product, quantity: Number(item.quantity) }));
        setUserCart(cart);
    }, [myCart]);


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
        quantity = quantity == 0 || quantity == null ? Number(1) : quantity+1;

        if (quantity > 1) {
            dispatch(updateProductQuantity({quantity , id , userEmailID}));
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

    const removeProductFromCart = (id)=>{
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
                                                quantity={userCart.filter(obj=> obj.product.id == item.id).map(obj=> Number(obj.quantity))}
                                                openProductDetailsModal={openProductDetailsModal}
                                                addProductTocart={addProductTocart}
                                                deleteProduct={deleteProduct}
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