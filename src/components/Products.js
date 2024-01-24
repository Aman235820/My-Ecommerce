import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/slices/cartSlice';

export default function Products(props) {

  const dispatch = useDispatch();

  const openProductModal = (id) => {
    props.openProductDetailsModal(id);
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
            <Link to="#" className="btn btn-primary">Add to Cart</Link>
            <br/>
            <br/>
            <button className="btn btn-warning" onClick={() => { openProductModal(props.id) }}>View Item</button>
        </div>
      </div>

    </>
  );
}