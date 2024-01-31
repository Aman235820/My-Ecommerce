import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ProductModal(props) {


    const [myProduct, setMyProduct] = useState({});

    const productData = useSelector((state) => {
        return (state.allProducts).allProducts;
    });

    useEffect(() => {

        document.body.style.overflowY = 'hidden';

        return () => {
            document.body.style.overflowY = 'scroll';
        };

    }, []);

    useEffect(() => {
        const productId = props.productId;
        const product = productData.filter(item => item.id == productId);
        setMyProduct(product[0]);
    }, [productData]);



    return ReactDOM.createPortal(
        <>
            <div className="modal-wrapper">
                <div className="modal-container">
                    <img src={myProduct.image} alt="img" height="150px" width="150px" />
                    <b><p>{myProduct.title}</p></b>
                    <p>{myProduct.description}</p>
                    <b><p>Price : ${myProduct.price}</p></b>
                    <br />
                    <button className='btn btn-dark' onClick={() => { props.closeModal() }} >Close Modal</button>
                </div>
            </div>
        </>,
        document.querySelector(".productModalClass")
    );
}