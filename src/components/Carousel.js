import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { json } from "react-router";
import { useContext } from "react";
import UserinputContext from "../context/UserinputContext"


function Carousel() {

    let a = useContext(UserinputContext);
    console.log("The category selected by the user is ",a.state.Category)
    console.log("The difficulty selected by the user is :", a.state.Difficulty)

    let [queslist, setQueslist] = useState([]) //Contains the list of all the questions fetched form the api

    let [pointer, setPointer] = useState(0) // This pointer will be used to point to the current question to display on screen

    let [currentques, setCurrentques] = useState([]) // This is the current question that will be displayed on the screen

    let [score, setScore] = useState(0) //The score of the user calculated will be stored in this state variable

    let [quizlen, setQuizlen] = useState(null) // This state contains the number of questions in the quiz

    let [flag, setFlag] = useState(true) //This flag will be used to toggle the submit and finish button on the quiz



    useEffect(() => {
        async function fetchData(x) {
            let data = await fetch("http://127.0.0.1:5001/getall", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(x)
            });
            console.log("first load")
            let jsonData = await data.json()
            console.log(jsonData)
            setQueslist(jsonData)
            console.log(queslist)
            setCurrentques(jsonData[pointer])
            const keyslist = Object.keys(jsonData)
            setQuizlen(keyslist.length)
        }
        let payload = {
            "Category":a.state.Category,
            "Difficulty":a.state.Difficulty
        }
        fetchData(payload);
    }, [])


    function handlesubmit(event) {
        event.preventDefault();
        console.log("quiz length is :", quizlen)
        if (event.target.options.value == currentques.Answer) {
            console.log("answer is correct!")
            setScore(score + 1)
        }
        else {
            console.log("incorrect answer!")
        }
        if (pointer < (quizlen - 1)) {
            const pointerNew = pointer + 1
            setPointer(pointer + 1)
            setCurrentques(queslist[pointerNew])
        }
        else {
            console.log("end of the quiz")
            setFlag(false)
        }

    }

    return (
        <>
            <div className="carousel" style={{display:flag?"block":"none"}}>
                <h3>Question: Question</h3>
                <div className="questionSpace">
                    <h2> {currentques.Question}</h2>
                </div>
                <div className="optionSpace">
                    <form onSubmit={handlesubmit}>
                        <div className="answerSpace">

                            <label>
                                <input value="A" type="radio" name="options"></input>
                                {currentques.A}
                            </label>
                            <label>
                                <input value="B" type="radio" name="options"></input>
                                {currentques.B}
                            </label>
                            <label>
                                <input value="C" type="radio" name="options"></input>
                                {currentques.C}
                            </label>
                            <label>
                                <input value="D" type="radio" name="options"></input>
                                {currentques.D}
                            </label>

                            <button type="submit" style={{ display: pointer <= (quizlen - 1) ? "block" : "none" }}  >SubmitAnswer</button>
                        </div>
                    </form>
                    <button style={{ display: flag ? "none" : "block" }} >Finish</button>
                </div>
            </div>
            <div className="result" style={{ display: flag ? "none" : "block" }}>
                <h3>Correct answers : {score}</h3>
                <h3>Total number of questions : {quizlen}</h3>
                <h3>Percentage correct : {(score/quizlen)*100}</h3>
            </div>
        </>
    )
}

export default Carousel;