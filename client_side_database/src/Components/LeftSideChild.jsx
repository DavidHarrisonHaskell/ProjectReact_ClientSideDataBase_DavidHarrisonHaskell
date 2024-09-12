import './LeftSideChild.css';
import { useEffect, useState, useRef } from 'react';
import React from 'react';

const LeftSideChild = (props) => {
    const [showData, setShowData] = useState(false);
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Street, setStreet] = useState("");
    const [City, setCity] = useState("");
    const [ZipCode, setZipCode] = useState("");

    const [isMisaligned, setIsMisaligned] = useState(false); // used to misalign the buttons
    const [orangeBackground, setOrangeBackground] = useState(false); // used to change the background color of the user's information
    const [showRightSide, setShowRightSide] = useState(false); // used to show the right side of the application
    const [isFirstRender, setIsFirstRender] = useState(true); // used to check if it is the first render
    const borderClassName = props.condition(props.user.id) ? "LeftSideChild borderRed" : "LeftSideChild borderGreen"; //  checks the border color condition
    const [showActiveUserData, setShowActiveUserData] = useState(false); // used to show the active user's data
    // if the condition is true, the border color is red, else, the border color is green

    // const backgroundColor = props.activeUserId === props.user.id && showRightSide ? "orangeBackground" : ""; // !!!!
    const backgroundColorCondition = props.activeUserId === props.user.id && props.showActiveUserData
    const backgroundColor = backgroundColorCondition ? "orangeBackground" : "";

    
    // console.log("TODOS for USERID: ",props.user.id," ",props.userTodos)
    // console.log("POSTS for USERID:", props.user.id," ", props.userPosts)
    // the console.log statements above are used to check the todos and posts for each user

    useEffect(() => {
        setName(props.user.name);
        setEmail(props.user.email);
        setStreet(props.user.address.street)
        setCity(props.user.address.city)
        setZipCode(props.user.address.zipcode)
    }, [props.user])

    const showOtherData = () => {
        setShowData(true);
        setIsMisaligned(true); //  causes the misalignement of the buttons
    }

    const hideOtherData = (event) => {
        //  Hides other data and sets the street, city, and zip code based on the user's address.

        // if the target is an input, then return
        if (event.target.tagName === "INPUT") {
            return;
        }
        // else, hide the other data and set the street, city, and zip code based on the user's original address
        setStreet(props.user.address.street)
        setCity(props.user.address.city)
        setZipCode(props.user.address.zipcode)
        setShowData(false);
        setIsMisaligned(false); // reverts to original alignment
    }

    const updateUser = () => {
        const updatedUser = {
            ...props.user,
            name: Name,
            email: Email,
            address: {
                ...props.user.address,
                street: Street,
                city: City,
                zipcode: ZipCode
            }
        }
        props.callback_updateUser(props.user.id, updatedUser);
    }


    const deleteUser = () => {
        props.callback_deleteUser(props.user.id);
    }

    const handleUser = () => {
        if (props.activeUserId === props.user.id) {
            // setShowRightSide(prevState => !prevState) //!!!!
            if (props.activeUserId !== null) {
            setShowActiveUserData(prevState => !prevState)
            } else {
                setShowActiveUserData(true)
            }
            props.callback_newUser(false)
        } else {
            // setShowRightSide(true) //!!!!
            setShowActiveUserData(true)
            props.callback_newUser(false)
        }
        // if (!backgroundColorCondition) {
        //     setShowActiveUserData(true)
        // }
        props.callback_activeUserId(props.user.id);
    }

    // useEffect(() => {
    //     if (props.activeUserId !== props.user.id) {
    //         setOrangeBackground(false)
    //     }
    // }, [showRightSide, props.user.id])

    // useEffect(() => {
    //     if (!isFirstRender && props.activeUserId !== props.user.id) {
    //         setShowRightSide(true)
    //         setOrangeBackground(!orangeBackground)
    //     }
    // }, [props.activeUserId, isFirstRender])

    // useEffect(() => {
    //     setIsFirstRender(true);
    // }, [])

    // useEffect(() => {
    //     if (props.activeUserId !== props.user.id) {
    //         setOrangeBackground(false)
    //     }
    // }, [props.activeUserId])

    // useEffect(() => {
    //     setShowRightSide(true)
    // }, [props.user.id])


    useEffect(() => { //  displays the right side of the application
        if (props.activeUserId === props.user.id) {
            // props.callback_displayRightSide(showRightSide, props.user.id, props.userTodos, props.userPosts); //!!!!
            props.callback_displayRightSide(showActiveUserData, props.user.id, props.userTodos, props.userPosts);
        }
    // }, [showRightSide, props.activeUserId, props.user.id]) //!!!!
    }, [showActiveUserData, props.activeUserId, props.user.id])


    return (
        <div className={`${borderClassName} ${backgroundColor}`}>
            <span>
                <label className='blueUnderline cursor_pointer' onClick={handleUser}>ID:</label>&nbsp;
                <label>{props.user.id}</label><br />
            </span>

            <span>
                <label className='blueUnderline'>Name:</label>&nbsp;
                <input className='fixed_margin-left' value={Name} onChange={e => setName(e.target.value)} /><br />
            </span>

            <span>
                <label className='blueUnderline'>Email:</label>&nbsp;
                <input className='fixed_margin-left' value={Email} onChange={e => setEmail(e.target.value)} /><br />
            </span>

            <div className={`buttonContainer ${isMisaligned ? 'misaligned' : ''}`}>
                <button onMouseOver={showOtherData} className="backgroundButton backgroundButtonOtherData">Other Data</button>

                {
                    // shows the other data if the showData state is true
                    showData && (
                        <div className="OtherData" onClick={hideOtherData} id="showOtherData">
                            <span>
                                <label className='blueUnderline'>Street:</label>&nbsp;
                                <input className='fixed_margin-left_OtherData' value={Street} onChange={e => setStreet(e.target.value)} /> <br />
                            </span>

                            <span>
                                <label className='blueUnderline'>City:</label>&nbsp;
                                <input className='fixed_margin-left_OtherData' value={City} onChange={e => setCity(e.target.value)} /><br />
                            </span>

                            <span>
                                <label className='blueUnderline'>Zip Code:</label>&nbsp;
                                <input className='fixed_margin-left_OtherData' value={ZipCode} onChange={e => setZipCode(e.target.value)} />
                            </span>
                        </div>
                    )}
                <div className="rightButtons">
                    <button className="backgroundButton" onClick={updateUser}>Update</button>
                    <button className="backgroundButton" onClick={deleteUser}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default LeftSideChild;