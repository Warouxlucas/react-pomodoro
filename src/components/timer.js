/* eslint-disable react/button-has-type */
import moment from "moment";
import React from "react";

const Timer = ({
    sessionLengthInSeconds, // this is where we accept the props
    incrementSessionLengthByOneMinute,
    decrementSessionLengthByOneMinute,
}) => {
    // const [sessionLengthInSeconds, setSessionLengthInSeconds] = useState(60 * 25);

    // const decrementSessionLengthByOneMinute = () => {
    //     const newSessionLengthInSeconds = sessionLengthInSeconds - 60;
    //     if (newSessionLengthInSeconds < 0) {
    //         setSessionLengthInSeconds(0);
    //     } else {
    //         setSessionLengthInSeconds(newSessionLengthInSeconds);
    //     }
    // };
    // const incrementSessionLengthByOneMinute = () =>
    //     setSessionLengthInSeconds(sessionLengthInSeconds + 60);

    const sessionLengthInMinutes = moment
        .duration(sessionLengthInSeconds, "s")
        .minutes();
    return (
        <div id={"travail"} className={"button-section"}>
            <p id={"session-label"}>{"Session"}</p>
            <p id={"session-length"}>{sessionLengthInMinutes}</p>
            <div className={"button-container"}>
                <button
                    id={"session-increment"}
                    onClick={incrementSessionLengthByOneMinute}>
                    {"+"}
                </button>
                <button
                    id={"session-decrement"}
                    onClick={decrementSessionLengthByOneMinute}>
                    {"-"}
                </button>
            </div>
        </div>
    );
};

export default Timer;
