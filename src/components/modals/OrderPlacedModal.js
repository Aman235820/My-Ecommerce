import { useEffect , useState , useRef } from "react";
import ReactDOM from "react-dom";
import {useNavigate} from "react-router-dom";
import {useDispatch} from'react-redux';
import { emptyUserCart } from "../../redux/actions";
import { removeCheckoutItems } from "../../redux/slices/cartSlice";

export default function OrderPlacedModal(props) {

    const closeRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
         document.body.style.overflowY='hidden';

         document.addEventListener('click' , (e)=>closePopup(e) , true);

         return()=>{
              document.body.style.overflowY='scroll';
         }
    },[]);

    const closePopup = (e)=>{
          if(closeRef.current && !closeRef.current.contains(e.target)){
              dispatch(removeCheckoutItems());
              dispatch(emptyUserCart(props.userEmailID));
              navigate("/profile");
            }
    }

    return ReactDOM.createPortal(
        <>
             <div className="modal-wrapper">
                <div className="modal-container" ref={closeRef}>
                       <h1>Order Placed Successfully !!</h1>
                       <button className="btn btn-dark" onClick={()=>{navigate("/profile")}}>Shop More...</button>
                </div>
             </div>
        </>,document.querySelector(".orderPlacedClass")
    );
}