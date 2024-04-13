import { useState, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [status, setStatus] = useState(false);
    const [user, setUser] = useState({});
    const [showProfileModal, setShowProfileModal] = useState(false);



    const openUserProfileModal = () => {
        setShowProfileModal(true);
    }

    const closeUserProfileModal = () => {
        setShowProfileModal(false);
    }

    return (
        <AuthContext.Provider value={{ status, setStatus, user, setUser , showProfileModal , openUserProfileModal , closeUserProfileModal }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;