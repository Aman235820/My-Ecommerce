
export default function Products(props) {

  const openProductModal = (id) => {
    props.openProductDetailsModal(id);
  }

  const addProduct = (id)=>{
      props.addProductTocart(id);
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
            <button className="btn btn-primary" onClick={()=>addProduct(props.id)}>Add to Cart</button>
            <br/>
            <br/>
            <button className="btn btn-warning" onClick={() => { openProductModal(props.id) }}>View Item</button>
        </div>
      </div>

    </>
  );
}