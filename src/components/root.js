// rootcomponent.js
import React, { useState, useEffect, useRef } from "react";
import Pause from "../components/pause";
import Timer from "../components/timer";
import TimeLeft from "../components/time-left";
import audio from "../audio/yeay.mp3";
import no from "../audio/no.mp3";

function RootComponent() {
    const audioElement = useRef(null);
    const audioBreak = useRef(null);
    const [currentSessionType, setCurrentSessionType] = useState("Timer"); //timer ou pause
    const [breakLengthInSeconds, setBreakLengthInSeconds] = useState(300);
    const [sessionLengthInSeconds, setSessionLengthInSeconds] = useState(
        60 * 25,
    );
    const [intervalId, setIntervalId] = useState(null);
    const [timeLeft, setTimeLeft] = useState(sessionLengthInSeconds);
    //change timeleft quand sessionLengthInSeconds change
    useEffect(() => {
        if (timeLeft === 0) {

            audioElement.current.play();
            if (currentSessionType === "Timer") {

                // audioElement.current.play();
                setCurrentSessionType("Pause");
                setTimeLeft(breakLengthInSeconds);
            } else if (currentSessionType === "Pause") {

                // audioBreak.current.play();
                setCurrentSessionType("Timer");
                setTimeLeft(sessionLengthInSeconds);
            }
        }
    }, [
        breakLengthInSeconds,
        sessionLengthInSeconds,
        currentSessionType,
        timeLeft,
    ]);
    useEffect(() => {
        setTimeLeft(sessionLengthInSeconds);
    }, [sessionLengthInSeconds]);

    // ajout d'un ecouteur de l'evenement timeLeft
    //si c'est zero
    //joue l'audio
    //change la session de pause a timer

    const decrementSessionLengthByOneMinute = () => {
        const newSessionLengthInSeconds = sessionLengthInSeconds - 60;
        if (newSessionLengthInSeconds < 0) {
            setSessionLengthInSeconds(0);
        } else {
            setSessionLengthInSeconds(newSessionLengthInSeconds);
        }
    };
    const incrementSessionLengthByOneMinute = () =>
        setSessionLengthInSeconds(sessionLengthInSeconds + 60);

    const decrementBreakLengthByOneMinute = () => {
        const newBreakLengthInSeconds = breakLengthInSeconds - 60;
        if (newBreakLengthInSeconds < 0) {
            setBreakLengthInSeconds(0);
        } else {
            setBreakLengthInSeconds(newBreakLengthInSeconds);
        }
    };
    const incrementBreakLengthByOneMinute = () =>
        setBreakLengthInSeconds(breakLengthInSeconds + 60);
    const isStarted = intervalId != null;
    const startStop = () => {
        if (isStarted) {
            // si on est en start
            //on veux stop le timer
            //clearInterval(()=>{})
            clearInterval(intervalId);
            setIntervalId(null);
        } else {
            //si on est stop
            // decrement timeleft de & chaque seconde
            //setInterval(() => {})
            const newIntervalId = setInterval(() => {
                setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
            }, 1000);
            setIntervalId(newIntervalId);
        }
    };
    const handleResetButtonClick = () => {
        //reset audio
        audioElement.current.load();
        // vider le timeout interval
        clearInterval(intervalId);
        // appliquer l'intervalId a null
        setIntervalId(null);
        //appliquer le sessiontype a 'Timer'
        setCurrentSessionType("Timer");
        //reinitaliser la session a 25 minutes
        setSessionLengthInSeconds(60 * 25);
        //reinitaliser la pause a 5 minutes
        setBreakLengthInSeconds(60 * 5);
        //reinitialiser la timer a 25min
        setTimeLeft(60 * 25);
    };
    return (
        <div className={"App"}>
            {isStarted ? (
                " "
            ) : (
                    <div>
                        <Pause
                            breakLengthInSeconds={breakLengthInSeconds}
                            incrementBreakLengthByOneMinute={
                                incrementBreakLengthByOneMinute
                            }
                            decrementBreakLengthByOneMinute={
                                decrementBreakLengthByOneMinute
                            }
                        />

                        <Timer
                            sessionLengthInSeconds={sessionLengthInSeconds}
                            incrementSessionLengthByOneMinute={
                                incrementSessionLengthByOneMinute
                            }
                            decrementSessionLengthByOneMinute={
                                decrementSessionLengthByOneMinute
                            }
                        />
                    </div>
                )}
            <TimeLeft
                currentSessionType={currentSessionType}
                startStop={startStop}
                timeLeft={timeLeft}
                startStopButtonLabel={isStarted ? "stop" : "start"}
                breakLengthInSeconds={breakLengthInSeconds}
                sessionLengthInSeconds={sessionLengthInSeconds}
                handleResetButtonClick={handleResetButtonClick}
            />

            <audio id={"audio"} ref={audioElement}>
                <source src={audio} type={"audio/mpeg"} />
            </audio>
            <audio id={"audio"} ref={audioBreak}>
                <source src={no} type={"audio/mpeg"} />
            </audio>
        </div>
    );
}

export default RootComponent;
