import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import UserinputContext from "../context/UserinputContext"



function Selectcategory() {
    let input = useContext(UserinputContext)
    let [categories, setCategories] = useState([])
    let navigate = useNavigate()

    console.log(input.state.Category)
    console.log(input.state.Difficulty)

    //Function that handles the submit click once the user selects the category
    function handleSubmit(event) {
        event.preventDefault();
        let category = event.target.selectcategoryOption.value
        let difficulty = event.target.difficulty.value
        let filter = {
            "category":category,
            "difficulty":difficulty
        }
        console.log("Selected the category :", category)
        console.log("Selected the diffiuclty level", difficulty)
        input.setState({"Category":category, "Difficulty":difficulty})
        navigate("/home")
    }



    //useEffect hook on the first render to fetch all the categories from
    // the database
    useEffect(() => {
        console.log("Fetching the categories from the database !")
        async function getcategories() {
            let catList = await fetch("http://127.0.0.1:5001/getcategory", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            let jsonList = await catList.json()
            setCategories(jsonList)
        }
        getcategories();
    }, [])

    return (
        <>
            <div className="maindiv-selectcategory">
                <h2>Categories :</h2>
                <form onSubmit={handleSubmit}>
                    <select name="selectcategoryOption">
                        {categories.map((i) => {
                            return (
                                <option value={i} >{i}</option>
                            )
                        })}
                    </select>

                    <h2>Difficulty:</h2>
                        <select id="difficulty" name="difficulty">
                            <option id="difficulty" type="text" value="easy">Easy</option>
                            <option id="difficulty" type="text" value="medium">Medium</option>
                            <option id="difficulty" type="text" value="hard">Hard</option>
                        </select>

                    <button type="submit">Start</button>
                </form>
            </div>
        </>
    )
}

export default Selectcategory;