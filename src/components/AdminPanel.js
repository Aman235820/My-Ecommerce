import { useSelector } from 'react-redux';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthProvider';
import Navbar from './Navbar';

function AdminPanel() {

    const placedOrders = useSelector((state) => {
        return state.masterData.placedOrders;
    })

    const { user } = useContext(AuthContext);

    const [hasAdminAccess, setAdminAccess] = useState(false);


    useEffect(() => {
        setAdminAccess(user?.userData?.AdminAccess);
    }, [user]);

    return (
        <>
            <Navbar></Navbar>
            {
                hasAdminAccess && (<div>Admin Access Avaliable</div>)
            }
            {
                !hasAdminAccess && (<div><p>You don't have Admin Access !!</p></div>)
            }
        </>
    );
}

export default AdminPanel;