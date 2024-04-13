import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export default function ProfileModal(props) {

    const userRef = useRef();

    useEffect(() => {
        document.body.style.overflowY = "hidden";
        document.addEventListener("mousedown", (e) => { closeModalpopup(e) }, true);

        return () => {
            document.body.style.overflowY = "scroll";
        }
    }, []);

    const closeModalpopup = (e) => {
        if (userRef.current && !userRef.current.contains(e.target.value)) {
            props.closeProfileModal();
        }
    }

    return ReactDOM.createPortal(
        <>
            <div className="modal-wrapper">
                <div className="modal-container" ref={userRef}>
                    <img src='cross.png' alt='img' height="15px" width="15px" onClick={() => { props.closeProfileModal() }} style={{ float: 'right', transition: 'transform 0.3s ease-in-out', cursor: 'pointer'}} /><br />
                    <img src="user.png" height="200px" width="200px" alt="img" />
                    <br /><br />
                    <p>{props.user.Name}</p>
                    <p>{props.user.Email}</p>
                    <p>{props.user.Age}</p>
                    <p>{props.user.Gender}</p>

                </div>
            </div>
        </>, document.querySelector(".profileModalClass")
    );
}