import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect, useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";

function Checkout() {

    const navigate = useNavigate();

    const cartCheckoutItems = useSelector((state) => {
        return (state.cartItems).checkoutItems;
    });

    const { user } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        if (user?.Email == cartCheckoutItems?.userEmailID) {
            setUserDetails(user?.userData);
        }
    },[]);

    const { register, handleSubmit,setValue , formState: { errors }, setError } = useForm({
        defaultValues: {
            name: userDetails?.Name
        }
    });

    const handleCheckoutDetails = (data) => {
        console.log(data);
    }

    const handleCustomNameChange = (e) => {
        let value = e.target.value;
        if (!(/^[a-zA-Z\s]+$/).test((value).trim())) {
            setError("name", {
                type: 'manual',
                message: "Please enter valid name"
            })
        }
        else {
            setError("name", null);
            setValue("name" , e.target.value)
        }
        return;
    }

    return (
        <>
            <div className="dashboard-wrapper">
                <div className='content-wrapper d-flex'>
                    <nav className="navbar sticky navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <span className="navbar-brand">Shoppers' Station</span>
                            <button className="btn btn-outline-success" type="submit" onClick={() => { navigate("/myCart") }}>Go to Cart  <img src="cart.png" height="17px" width="17px" alt="cart" /></button>
                        </div>
                    </nav>
                    <div className="loginbox">
                        <div className="container">
                            <form onSubmit={handleSubmit(handleCheckoutDetails)}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name="name" className="form-control"
                                            {
                                             ...register("name")
                                            }
                                            onChange={(e) => {
                                                handleCustomNameChange(e);
                                            }}
                                        />
                                        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" name="email" className="form-control" placeholder="Optional"
                                            {
                                            ...register("email", {
                                                validate: (value) => {
                                                    if (!(value).includes("@") && value != "") {
                                                        return "Enter valid email"
                                                    }
                                                    return true;
                                                }
                                            })
                                            }
                                        />
                                        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="email">Mobile No.:</label>
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
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <textarea type="text" name="address" className="form-control"
                                        {
                                        ...register("address", {
                                            required: true,
                                            message: "Please enter your home address"
                                        })
                                        }
                                    />
                                    {errors.address && <p style={{ color: "red" }}>{errors.address.message}</p>}
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="state">State</label>
                                        <select name="state" className="form-control"
                                            {
                                            ...register("state")
                                            }
                                        >
                                            <option selected>Choose...</option>
                                            <option>...</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label htmlFor="pincode">Zip</label>
                                        <input type="text" name="pincode" className="form-control" value={userDetails?.Pincode}
                                            {
                                            ...register("pincode")
                                            }
                                        />
                                    </div>
                                </div>
                                <br />
                                <button type="submit" className="btn btn-primary">Proceed</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Checkout;
