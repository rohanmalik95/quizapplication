import React from "react";
import Userinput from "./UserinputContext";

const UserInput = (props) =>
{
    let state = {
        "name":"Rohan",
        "class":"Malik"
    }
    return(
        <Userinput.Provider value  ={state}>
            {props.children}
        </Userinput.Provider>
    )
}
export default UserInput;

