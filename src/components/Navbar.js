import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

export default function Navbar() {

    const { user, setUser, setStatus } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        secureLocalStorage.removeItem("userLogin");
        setUser(null);
        setStatus(false);
        navigate("/");
    }

    return (
        <nav className="navbar sticky navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand">Shoppers' Station</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="ms-auto margin-auto">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/profile">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${user?.userData?.AdminAccess ? "" : "disabled"}`} href="/admin" tabIndex="-1" aria-disabled="true">Admin</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/myOrders">My Orders</a>
                            </li>
                            <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="userIcon.png" width="20px" height="20px" alt="user" />{user?.userData?.Name}
                                </span>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><span className="dropdown-item">Profile</span></li>
                                    <li><span className="dropdown-item">24x7 Customer Care</span></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><span className="dropdown-item" onClick={handleLogout}>Logout</span></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link to="/myCart"><img src="cart.png" height="30px" width="30px" alt="cart" /></Link>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-outline-success" onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}