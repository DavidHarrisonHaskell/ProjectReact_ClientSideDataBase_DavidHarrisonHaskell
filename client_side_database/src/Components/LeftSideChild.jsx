import './LeftSideChild.css';

const LeftSideChild = (props) => {

    console.log("props.condition",props.condition)
    const borderClassName = props.condition ? "LeftSideChild borderRed" : "LeftSideChild borderGreen";

    return (
        <div className={borderClassName}>
            ID: {props.user.id} <br />
            Name: {props.user.name} <br />
            Email: {props.user.email} <br />
            <div className="buttonContainer">
                <button className="backgroundButton backgroundButtonOtherData">Other Data</button>
                <div className="rightButtons">
                    <button className="backgroundButton">Update</button>
                    <button className="backgroundButton">Delete</button>
                </div>
            </div>
        </div>
    );
}

export default LeftSideChild;