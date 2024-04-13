import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCheckoutItems } from "../../redux/slices/cartSlice";


export default function ProceedToBuy(props) {

    const [subTotal, setSubTotal] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        document.addEventListener('mousedown', (e) => { closeModalPopup(e) }, true);

        calculateSubTotal();

        return () => {
            document.body.style.overflowY = 'scroll';
        };


    }, []);

    const calculateSubTotal = () => {
        let totalAmount = (props.productDetails).reduce((accumulator, product) => {
            return accumulator + Number(product.amount);
        }, 0);
        setSubTotal(Math.round((totalAmount * 100) / 100).toFixed(2));
    }

    const closeModalPopup = (e) => {
        if (closeRef.current && !closeRef.current.contains(e.target)) {
            props.closeProccedtoBuyModal();
        }
    }

    const handleCheckout = () => {
        dispatch(addCheckoutItems({ userEmailID: props.userEmailID, items: props.productDetails, total: subTotal }));
        navigate("/checkoutPage");
    }


    const closeRef = useRef();

    return ReactDOM.createPortal(
        <>
            <div className="modal-wrapper">
                <div className="modal-container" ref={closeRef}>
                <img src='cross.png' alt='img' height="15px" width="15px" onClick={() => { props.closeProccedtoBuyModal() }} style={{ float: 'right', transition: 'transform 0.3s ease-in-out', cursor: 'pointer'}} /><br />
                    
                    {
                        (props.productDetails).map(item => {
                            return (
                                    <div key={item.uniqueId}>
                                        <p key={item.Id}><img width="40px" height="40px" alt="img" src={item.image} /><span>{item.name + " (" + item.quantity + ")"}</span></p>
                                    </div>
                            )
                        })
                    }
                    <b>SubTotal<span>&lt;{props.productDetails.length} items&gt;</span> : ₹{subTotal}</b>
                    <br /><br />
                    <button className="btn btn-success m-3" onClick={handleCheckout}>Checkout</button>
                </div>
            </div>

        </>, document.querySelector(".buyItemsModalClass")
    );

}