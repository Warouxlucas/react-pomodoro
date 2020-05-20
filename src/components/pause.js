/* eslint-disable react/button-has-type */
import React from "react";
import moment from "moment";
const Pause = ({
    breakLengthInSeconds,
    incrementBreakLengthByOneMinute,
    decrementBreakLengthByOneMinute,
}) => {
    const breakLengthInMinutes = moment
        .duration(breakLengthInSeconds, "s")
        .minutes();
    return (
        <div id={"pause"} className={"button-section"}>
            <p id={"break-label"}>{"Pause"}</p>
            <p id={"break-length"}>{breakLengthInMinutes}</p>
            <button
                id={"break-increment"}
                onClick={incrementBreakLengthByOneMinute}>
                {"+"}
            </button>

            <button
                id={"break-decrement"}
                onClick={decrementBreakLengthByOneMinute}>
                {"-"}
            </button>
        </div>
    );
};
export default Pause;
