import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { removeCheckoutItems } from "../redux/slices/cartSlice";
import IndianStates from "./../states.json";
import { setPlacedOrders , emptyUserCart } from "../redux/actions";

function Checkout() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [proccedOnlineButton, setProceedOnlineButton] = useState(false);
    const [promocode, setPromocode] = useState("");
    const [totalAmount, setTotalAmont] = useState(0);
    const [userDetails, setUserDetails] = useState({});
    const [discountAmount, setDiscountAmount] = useState(0);
    const [discountClaimed, setDiscountClaimed] = useState(false);
    const [couponTags, setCouponTags] = useState([]);

    const cartCheckoutItems = useSelector((state) => {
        return (state.cartItems).checkoutItems;
    });

    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user?.Email == cartCheckoutItems?.userEmailID) {
            setUserDetails(user?.userData);
        }
        setValue("name", userDetails?.Name);
    }, [cartCheckoutItems, user, userDetails]);

    useEffect(() => {
        setTotalAmont(cartCheckoutItems[0].total);
    }, []);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();


    const goBacktoCart = () => {
        dispatch(removeCheckoutItems());
        navigate("/myCart");
    }

    const onPaymentMethodChange = (e) => {
        let value = e.target.value;
        if (value == 'online') {
            setProceedOnlineButton(true)
        }
        else {
            setProceedOnlineButton(false);
        }
    }

    const handlePromoCode = (e) => {
        let value = (e.currentTarget.value).toUpperCase().trim();
        setPromocode(value);
    }

    const redeemPromoCode = () => {
        if (promocode && promocode === 'SAVE20' && !discountClaimed) {
            let total = totalAmount;
            let discount = (0.20) * total;
            setDiscountAmount((Math.round(discount * 100) / 100).toFixed(2));
            total -= discount;
            setTotalAmont((Math.round(total * 100) / 100).toFixed(2));
            setDiscountClaimed(true);
            setCouponTags([...couponTags, promocode]);
        }
        else {
            if (discountClaimed) {
                alert("Discount already claimed");
            }
            else {
                alert("Invalid promocode");
            }
        }
    }

    const removeTag = (index) => {
        setCouponTags(couponTags.filter((obj, i) => i !== index));
        setDiscountClaimed(false);
        let total = Number(totalAmount);
        let discount = Number(discountAmount);
        total += discount;
        setDiscountAmount(0);
        setTotalAmont((Math.round(total * 100) / 100).toFixed(2));
        setPromocode(document.getElementById("promoInput").value);
    }

    const placeOrder = (data) => {
        if (proccedOnlineButton) {
               alert("Sorry , server down for online payment !!")
        }
        else {
            let placedItemsObj = {
                customerInfo: data,
                articles: cartCheckoutItems[0].items,
                amountPaid: totalAmount,
                discountClaimed: discountClaimed,
                discountAmount: discountAmount,
                timeofPurchase: new Date().toISOString()
            }
            dispatch(setPlacedOrders(placedItemsObj));
            dispatch(removeCheckoutItems());
            dispatch(emptyUserCart(user?.userData?.Email));
            alert("Congratulations Order placed Successfully !! Press OK to explore more items.");
            navigate("/profile")
        }
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
                    <div className="container">
                        <div className="row justify-content-between py-3">
                            <h2 className="px-4 text-start ">Checkout details</h2>
                            <div className="checkout-form col-md-7 p-3">
                                <div className="container">
                                    <form onSubmit={handleSubmit(placeOrder)}>
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
                                                <label htmlFor="email" className="mb-1">Mobile Number</label>
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
                                            <div className="form-group col-md-6">
                                                <label className="mb-1">Payment Method</label>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault"
                                                        {...register("paymentMethod")}
                                                        value="online"
                                                        onChange={(e) => onPaymentMethodChange(e)}
                                                    />
                                                    <label className="form-check-label">
                                                        Online Payment
                                                    </label>
                                                    <br />
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" defaultChecked
                                                        {...register("paymentMethod")}
                                                        value="cod"
                                                        onChange={(e) => onPaymentMethodChange(e)}
                                                    />
                                                    <label className="form-check-label">
                                                        Cash on Delivery
                                                    </label>
                                                </div>
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
                                                    <option defaultValue>--State--</option>
                                                    {
                                                        IndianStates.map((obj) => (
                                                            <option key={obj.code} value={obj.name}>{obj.name}</option>
                                                        ))
                                                    }
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
                                        <button type="submit" className="btn btn-primary w-100">{proccedOnlineButton ? "Proceed to Pay" : "Place Order"}</button>
                                    </form>
                                </div>
                            </div>
                            {/* <div className="col-md-1"></div> */}

                            <div className="ryt-content border rounded shadow col-md-4 p-3">

                                <h4 className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="text-primary">Your cart</span>
                                    <span className="badge bg-primary rounded-pill">{cartCheckoutItems[0].items.length}</span>
                                </h4>
                                <ul className="list-group mb-3">
                                    {(cartCheckoutItems[0].items).map(obj => (
                                        <li className="list-group-item d-flex justify-content-between lh-sm" key={obj.id}>
                                            <h6 style={{ fontSize: "14px" }} className="my-0">{(obj.name).length > 30 ? (obj.name).slice(0, 30) : obj.name} <small className="text-muted d-block">Quantity: {obj.quantity}</small></h6>

                                            <b style={{ fontSize: "14px" }} className="text-muted text-end">₹{obj.amount}  <span className="d-block fw-normal">₹{obj.price} <small>per item</small></span></b>
                                        </li>
                                    ))
                                    }
                                    <li className="list-group-item d-flex justify-content-between bg-light">
                                        <div className="text-success">
                                            <h6 className="my-0">Promo code</h6>
                                            <small>
                                                {couponTags.map((tag, index) => (
                                                    <div className="tag-item" key={index}>
                                                        <span className="text">{tag}</span>
                                                        <span className="close" onClick={() => removeTag(index)}>&times;</span>
                                                    </div>
                                                ))}

                                            </small>
                                        </div>
                                        <span className="text-success">−₹{discountAmount}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Total (INR)</span>
                                        <strong>₹{totalAmount}</strong>
                                    </li>
                                </ul>
                                <div className="input-group">
                                    <input type="text" className="form-control" id="promoInput" placeholder="Promo code" onKeyDown={(e) => { if (e.key == 'Enter') { redeemPromoCode() } }} onChange={(e) => handlePromoCode(e)} disabled={discountClaimed} />
                                    <button type="submit" className="btn btn-secondary" onClick={() => redeemPromoCode()} disabled={discountClaimed} >Redeem</button>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}
export default Checkout;
