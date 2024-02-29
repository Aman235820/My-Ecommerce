import { useEffect , useState , useRef } from "react";
import ReactDOM from "react-dom";
import {useNavigate} from "react-router-dom";

export default function OrderPlacedModal(props) {

    const closeRef = useRef();
    const navigate = useNavigate();

    useEffect(()=>{
         document.body.style.overflowY='hidden';

         document.addEventListener('click' , (e)=>closePopup(e) , true);

         return()=>{
              document.body.style.overflowY='scroll';
         }
    },[]);

    const closePopup = (e)=>{
          if(closeRef.current && !closeRef.current.contains(e.target)){
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