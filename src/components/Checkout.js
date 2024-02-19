import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { removeCheckoutItems } from "../redux/slices/cartSlice";

function Checkout() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartCheckoutItems = useSelector((state) => {
        return (state.cartItems).checkoutItems;
    });

    const { user } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        if (user?.Email == cartCheckoutItems?.userEmailID) {
            setUserDetails(user?.userData);
        }
    }, [cartCheckoutItems , user , userDetails]);


    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleCheckoutDetails = (data) => {
        console.log(data);
    }

    const goBacktoCart = () => {
        dispatch(removeCheckoutItems());
        navigate("/myCart");
    }

    return (
        <>
            <div className="dashboard-wrapper">
                <div className='content-wrapper d-flex'>
                    <nav className="navbar sticky navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <span className="navbar-brand">Shoppers' Station</span>
                            <button className="btn btn-outline-success" type="submit" onClick={() => goBacktoCart()}>Go to Cart  <img src="cart.png" height="17px" width="17px" alt="cart" /></button>
                        </div>
                    </nav>
                    <div className="row">
                        <div className="checkout-form col-md-6 p-3">
                            <div className="container">
                                <form onSubmit={handleSubmit(handleCheckoutDetails)}>
                                    <div className="row">
                                        <div className="form-group col-md-6 mb-3">
                                            <label htmlFor="name" className="mb-1">Name</label>
                                            <input type="text" name="name" className="form-control" defaultValue={userDetails?.Name}
                                                {
                                                ...register("name", {
                                                    required: "Please enter name",
                                                    validate: (value) => {
                                                        if (!(/^[a-zA-Z\s]+$/).test(value?.trim())) {
                                                            return "Enter characters only";
                                                        }
                                                        return true;
                                                    }
                                                })
                                                }

                                            />
                                            {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
                                        </div>
                                        <div className="form-group col-md-6 mb-3">
                                            <label htmlFor="email" className="mb-1">Email</label>
                                            <input type="text" name="email" className="form-control" placeholder="Optional" defaultValue={userDetails?.Email}
                                                {
                                                ...register("email", {
                                                    validate: (value) => {
                                                        if (value !== "" && !value.includes("@")) {
                                                            return "Enter valid EmailID";
                                                        }
                                                        return true;
                                                    }
                                                })
                                                }
                                            />
                                            {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                                        </div>
                                        <div className="form-group col-md-6 mb-3">
                                            <label htmlFor="email" className="mb-1">Mobile Number:</label>
                                            <input type="text" name="mobile" className="form-control" maxLength={10}
                                                {
                                                ...register("mobile", {
                                                    required: "Enter mobile number",
                                                    validate: (value) => {
                                                        if (!(/^\d{10}$/).test(value)) {
                                                            return "Please enter valid mobile number";
                                                        }
                                                        return true;
                                                    }
                                                })
                                                }
                                            />
                                            {errors.mobile && <p style={{ color: "red" }}>{errors.mobile.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group col-md-12 mb-3">
                                        <label htmlFor="address" className="mb-1">Address</label>
                                        <textarea type="text" name="address" rows={2} className="form-control"
                                            {
                                            ...register("address", {
                                                required: "Please enter your home address"
                                            })
                                            }
                                        />
                                        {errors.address && <p style={{ color: "red" }}>{errors.address.message}</p>}
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="state" className="mb-1">State</label>
                                            <select name="state" className="form-control"
                                                {
                                                ...register("state")
                                                }
                                            >
                                                <option defaultValue>Choose...</option>
                                                <option>...</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="pincode" className="mb-1">Zip</label>
                                            <input type="text" name="pincode" className="form-control" value={userDetails?.Pincode}
                                                {
                                                ...register("pincode")
                                                }
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-primary w-100">Proceed</button>
                                </form>
                            </div>
                        </div>

                        <div className="ryt-content col-md-6 p-3">
                            gbffgjndfgj
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}
export default Checkout;
