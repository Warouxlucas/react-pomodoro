/* eslint-disable react/button-has-type */
// components/TimeLeft.jsx
import React from "react";

// TimeLeft.jsx
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

const TimeLeft = ({
    startStop,
    startStopButtonLabel,
    timeLeft,
    currentSessionType,
    handleResetButtonClick,
}) => {
    const formattedTimeLeft = moment.duration(timeLeft, "s").format("mm:ss");
    return (
        <div id={"central-timer"}>
            <div className={"button-flex"}>
                <p id={"Timer"}>{currentSessionType}</p>
                <p id={"time-left"}>{formattedTimeLeft}</p>
                <div className={"button-container"}>
                    <button className={"button"} onClick={startStop}>
                        {startStopButtonLabel}
                    </button>

                    <button id={"reset"} onClick={handleResetButtonClick}>
                        {"reset"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimeLeft;
