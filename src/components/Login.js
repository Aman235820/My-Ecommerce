import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { GetData } from "../DataService";
import secureLocalStorage  from "react-secure-storage";

function Login() {

    const navigate = useNavigate();
    const { setStatus } = useContext(AuthContext);
    const [loginDetails, setLoginDetails] = useState({
        email : "abc@gmail.com",
        password : "123"
    });
    const [formValidation, setFormValidation] = useState({ login: true });

    const handleEmailChange = (e) => {
        setLoginDetails(prev => {
            return ({ ...prev, email: e.target.value });
        });
    }

    const handlePasswordChange = (e) => {
        setLoginDetails(prev => {
            return ({ ...prev, password: e.target.value });
        });
    }

    const handleSubmit = async (e) => {
        console.log(loginDetails)
        e.preventDefault();
        const response = await GetData();
        let validCredentials = false;
        validCredentials=(response.data).some(checkCredentials);
        if (validCredentials) {
            setFormValidation({ ...formValidation, login: true });
            setStatus(true);
            secureLocalStorage.setItem("userLogin", JSON.stringify(loginDetails));
            navigate("/profile");
        }
        else {
            setFormValidation({ ...formValidation, login: false });
            setTimeout(()=>{
                 setFormValidation({...formValidation , login : true});
            },5000);
            setStatus(false);
        }
    }

    function checkCredentials(item) {
        if(item.Email == loginDetails.email && item.Password == loginDetails.password){
            return true;
        }
    }

    return (
        <div className="loginbox">
            <div className="container border">
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" defaultValue={"abc@gmail.com"} onChange={handleEmailChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" defaultValue={"123"} onChange={handlePasswordChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <br />
                    {!formValidation.login && <span className="error">Invalid User</span>}
                    <br />
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Login;