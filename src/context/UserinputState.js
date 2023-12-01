import React from "react";
import Userinput from "./UserinputContext";
import { useState } from "react";

const UserInput = (props) =>
{
    let userInput = {
        "Category":"categoryNotSelected",
        "Difficulty":"difficultyNotSelected"}
        
    let [state ,setState] = useState(userInput)

    return(
        <Userinput.Provider value  ={{state,setState}}>
            {props.children}
        </Userinput.Provider>
    )
}
export default UserInput;

