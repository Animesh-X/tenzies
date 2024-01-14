import React from "react";
import "./Die.css"

export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div className="die-face" onClick={props.holdDice} style={styles} >
            <h2 className="dice-num" >{props.value}</h2>
        </div>
    )
}