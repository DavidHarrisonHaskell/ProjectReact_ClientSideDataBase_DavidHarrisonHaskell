import './LeftSideChild.css';

const LeftSideChild = () => {

    return (
        <div className="LeftSideChild">
            ID: <br />
            Name: <br />
            Email: <br />
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