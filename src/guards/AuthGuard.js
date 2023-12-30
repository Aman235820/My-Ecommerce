import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { GetData } from "../DataService";

const AuthGuard = ({ children }) => {

    useEffect(() => {
        checkUser();
    }, [children]);
    const navigate = useNavigate();
    const { status, setStatus, setUser } = useContext(AuthContext);

    const checkUser = async () => {

        const loginCookie = JSON.parse(localStorage.getItem("userLogin"));
        if (loginCookie) {
            setStatus(true);
            const response = await GetData();
            const userDetails = (response.data).filter(item => item.Email == loginCookie.email && item.Password == loginCookie.password);
            const userData = userDetails[0];
            setUser(prev => {
                return { ...prev, userData }
            });
            return;
        }

        try {
            if (!status) {
                navigate('/');
            }
        } catch (error) {
            navigate('/');
        }
    }

    return status ? <React.Fragment>{children}</React.Fragment> : <React.Fragment></React.Fragment>
}

export default AuthGuard;