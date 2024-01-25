import { useContext , useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { addProduct } from '../redux/slices/cartSlice';
import AuthContext from "../context/AuthProvider";

export default function Products(props) {

  const dispatch = useDispatch();
  const {user} = useContext(AuthContext);
  const productData = useSelector((state)=>{
        return (state.allProducts).allProducts;
  });

  const myCart = useSelector((state)=>{
        return state.cartItems.cartArray;
  });

  useEffect(()=>{
    console.log(myCart);
  },[myCart])

  const openProductModal = (id) => {
    props.openProductDetailsModal(id);
  }

  const addProductTocart = (id)=>{
      const product = productData.filter(item=> item.id == id);
      let cartObj = {
           "user" : user?.userData?.Email,
           "product" : product[0]
      }

      dispatch(addProduct(cartObj));
  }

  const truncatedDescription = (
    <>
      {props.desc.slice(0, 150)} <span style={{ color: 'blue' }} onClick={() => openProductModal(props.id)}>...Read More</span>
    </>
  );
  return (
    <>

      <div className="card">
        <img className="card-img-top p-2" src={props.image} height="200px" width="200px" alt="img" />
        <div className="card-body">
          <h6 className="card-title">{props.title}</h6>
          <p className="card-text">{props.desc.length > 150 ? truncatedDescription : props.desc}</p>
            <button className="btn btn-primary" onClick={ ()=>addProductTocart(props.id)}>Add to Cart</button>
            <br/>
            <br/>
            <button className="btn btn-warning" onClick={() => { openProductModal(props.id) }}>View Item</button>
        </div>
      </div>

    </>
  );
}