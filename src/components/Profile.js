import React, { useContext, useEffect } from 'react';
import AuthContext from "../context/AuthProvider";
import SideBar from './SideBar';
import Navbar from './Navbar';

function Profile() {

    const { user } = useContext(AuthContext);

    const name = user?.userData?.Name;
    const Age = user?.userData?.Age;
    const Gender = user?.userData?.Gender;
    const Pincode = user?.userData?.Pincode;

    return (
        <>
            <div className="dashboard-wrapper">
                <SideBar Name={name}
                    Age={Age}
                    Gender={Gender}
                    Pincode={Pincode}
                ></SideBar>
                <div className='content-wrapper'>
                    <Navbar></Navbar>
                </div>
            </div>
        </>
    );
}

export default Profile;