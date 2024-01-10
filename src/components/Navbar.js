import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Link } from "react-router-dom";
export default function Navbar() {

    const { setUser, setStatus , setProductCategory } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("userLogin");
        setUser(null);
        setStatus(false);
        navigate("/");
    }

    return (
        <nav className="navbar sticky navbar-expand-lg navbar-dark bg-dark" id="navs">
            <span className="navbar-brand">Shoppers' Station</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="#" onClick={()=>{setProductCategory(1)}}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#"  onClick={()=>{setProductCategory(2)}}>Men's</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="#" onClick={()=>{setProductCategory(3)}}>Women's</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="#" onClick={()=>{setProductCategory(4)}}>Electronics</Link>
                    </li>

                    {/* <li className="nav-item">
                        <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li> */}
                </ul>
                <div className="ms-auto margin-auto">
                    <li className="nav-item">
                        <Link to="#"><img src="cart.png" height="30px" width="30px" /></Link>
                    </li>
                </div>
                <div>
                    <li className="nav-item">
                        <button className="btn btn-outline-success" onClick={handleLogout}>Logout</button>
                    </li>
                </div>
            </div>
        </nav>
    );
}