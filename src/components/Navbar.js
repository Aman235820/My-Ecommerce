import { useNavigate } from "react-router-dom";
import { useContext, useEffect , useState } from "react";
import AuthContext from "../context/AuthProvider";
import { Link , useLocation } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { useSelector } from "react-redux";


export default function Navbar(props) {
    
    const location = useLocation();

    useEffect(()=>{
        
        if(location.pathname === "/myCart" || location.pathname === "/myOrders"){
            setLocation(true);
        }
        
    },[location]);
    
    const { user, setUser, setStatus, openUserProfileModal } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [isCorrectLocation , setLocation] = useState(false);

    const cartItems = useSelector(state => state.cartItems);

    const quant = cartItems.cartArray.filter(item => item.user == user?.userData?.Email).length;

    const handleLogout = () => {
        secureLocalStorage.removeItem("userLogin");
        setUser(null);
        setStatus(false);
        navigate("/");
    }

    const openProfile = () => {
        openUserProfileModal();
    }

    const openSupportAlert = () => {
        alert("Our support staff will reach out to you shortly. Thank you for your patience !!")
    }

    const handleProductSearch = (e)=>{
         let value = e.target.value;
         props.filterProductsOnSearch(value);
    }

    return (
        <nav className="navbar sticky navbar-expand-lg navbar-dark bg-dark position-fixed w-100 top-0">
            <div className="container-fluid">
                <span className="navbar-brand">Shoppers' Station</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isCorrectLocation && <form className="col-lg-3 col-12 my-auto mx-3 search-bar">
                        <input type="search" className="form-control" placeholder="Search products..." onChange={(e)=>{handleProductSearch(e)}} aria-label="Search"/>
                    </form>}
                    <div className="ms-auto margin-auto">
                        <ul className="navbar-nav my-auto">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/profile">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${user?.userData?.AdminAccess ? "" : "disabled"}`} to="/admin" tabIndex="-1" aria-disabled="true">Admin</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/myOrders">My Orders</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="userIcon.png" width="20px" height="20px" alt="user" className="userIcon" />{user?.userData?.Name}
                                </span>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><span className="dropdown-item" onClick={openProfile}>Profile</span></li>
                                    <li><span className="dropdown-item" onClick={openSupportAlert}>24x7 Customer Care</span></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><span className="dropdown-item" onClick={handleLogout}>Logout</span></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <span className="nav-item position-relative">
                                    <Link to="/myCart"><img src="cart.png" alt="cart" height="30px" width="30px" style={{ position: 'relative' }} />
                                        <span className="position-absolute top-0 start-700 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.7em' }}>
                                            {quant}
                                        </span></Link>
                                </span>
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