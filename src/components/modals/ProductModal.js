import  ReactDOM from "react-dom";
import { useEffect , useState } from "react";
import { useSelector } from "react-redux";

export default function ProductModal(props) {


    const [myProduct , setMyProduct] = useState({});

    const productData = useSelector((state)=>{
        return (state.allProducts).allProducts;
    });

    useEffect(()=>{

          document.body.style.overflowY = 'hidden';

          return()=>{
              document.body.style.overflowY = 'scroll';
          };

    },[]);

    useEffect(()=>{
           const productId = props.productId;
           const product = productData.filter(item => item.id == productId);
           setMyProduct(product[0]);
    },[productData]);

    

    return ReactDOM.createPortal(
        <>
            <div className="modal-wrapper" onClick={()=>props.closeModal()}></div>
            <div className="modal-container">
                <img src={myProduct.image} alt="img" height="150px" width="150px"/>
                <p>{myProduct.title}</p>
                <p>{myProduct.description}</p>
                <p>{myProduct.category}</p>
                <br/>
                <button className='btn btn-dark'  onClick={()=>{props.closeModal()}} >Close Modal</button>
            </div>
        </>,
        document.querySelector(".productModalClass")
    );
}