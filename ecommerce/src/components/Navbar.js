import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../context/AuthProvider";
export default function Navbar() {

    const {setUser , setStatus} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = ()=>{
         localStorage.removeItem("userLogin");
         setUser(null);
         setStatus(false);
         navigate("/");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="navs">
            <span className="navbar-brand">Shoppers' Station</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li>
                </ul>
                <div className="ms-auto margin-auto">
                    <button className="btn btn-outline-success" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
}