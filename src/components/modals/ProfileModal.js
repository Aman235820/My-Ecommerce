import { useContext, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import AuthContext from "../../context/AuthProvider";

export default function ProfileModal() {

    const userRef = useRef();
    const {user , closeUserProfileModal} = useContext(AuthContext);

    useEffect(() => {
        document.body.style.overflowY = "hidden";
        document.addEventListener("mousedown", (e) => { closeModalpopup(e) }, true);

        return () => {
            document.body.style.overflowY = "scroll";
        }
    }, []);

    const closeModalpopup = (e) => {
        if (userRef.current && !userRef.current.contains(e.target)) {
            closeUserProfileModal();
        }
    }

    return ReactDOM.createPortal(
        <>
            <div className="modal-wrapper">
                <div className="modal-container" ref={userRef}>
                    <img src='cross.png' alt='img' height="15px" width="15px" onClick={() => { closeUserProfileModal() }} style={{ float: 'right', transition: 'transform 0.3s ease-in-out', cursor: 'pointer'}} /><br />
                    <img src="user.png" height="200px" width="200px" alt="img" />
                    <br /><br />
                    <p>{user?.userData?.Name}</p>
                    <p>{user?.userData?.Email}</p>
                    <p>{user?.userData?.Age}</p>
                    <p>{user?.userData?.Gender}</p>

                </div>
            </div>
        </>, document.querySelector(".profileModalClass")
    );
}