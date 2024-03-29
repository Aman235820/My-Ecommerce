import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Products(props) {

  const openProductModal = (id) => {
    props.openProductDetailsModal(id);
  }

  const addProduct = (id) => {
    props.addProductTocart(id);
  }

  const removeProduct = (id) => {
    props.deleteProduct(id);
  }

  const truncatedDescription = (
    <>
      {props.desc.slice(0, 150)} <Link style={{ color: 'blue', cursor: 'pointer' }} onClick={() => openProductModal(props.id)}>...Read More</Link>
    </>
  );
  return (
    <>

      <div className="card">
        <img className="card-img-top px-4 pt-3" src={props.image} height="200px" width="150px" alt="img" />
        <div className="card-body">
          <h6 className="card-title">{props.title}</h6>
          <p className="card-text">{props.desc.length > 150 ? truncatedDescription : props.desc}</p>
          <div className='bottom-btns'>
            {
              (props.quantity < 1) && (<button className="btn btn-primary d-inline-block mx-3" onClick={() => addProduct(props.id)}>Add to Cart</button>)
            }
            {
              (props.quantity >= 1) && (<span className="btn-box mx-3"><button className="btn btn-success" onClick={() => addProduct(props.id)}>&#x002B;</button>{props.quantity}<button className="btn btn-danger" onClick={() => removeProduct(props.id)}>&#8722;</button></span>)
            }
            <button className="btn btn-warning" onClick={() => { openProductModal(props.id) }}>View Item</button>
          </div>
        </div>
      </div>

    </>
  );
}

Products.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string
}