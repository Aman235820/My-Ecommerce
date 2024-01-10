import { Link } from "react-router-dom";

export default function Products(props) {
  return (
    <>

      <div className="card">
        <img className="card-img-top p-2" src={props.image} height="200px" width="200px" />
        <div className="card-body">
          <h6 className="card-title">{props.title}</h6>
          <p className="card-text">{props.desc}</p>
          <Link to="#" className="btn btn-primary">Add to Cart</Link>
        </div>
      </div>

    </>
  );
}