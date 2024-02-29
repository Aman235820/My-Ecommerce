export default function SideBar(props) {
    return (
        <>
            <div className="sidebar-container">
                <img src="user.png" height="100px" width="100px" alt="user"/>
                <br />
                <p>{props.Name}</p>
                <br />
                <div className="details">
                    <b>User Details</b>
                    <br/><br/><br/>
                    <p>Age : {props.Age}</p>
                    <p>Gender : {props.Gender}</p>
                    <p>Pincode : {props.Pincode}</p>
                </div>
            </div>
        </>
    );
}