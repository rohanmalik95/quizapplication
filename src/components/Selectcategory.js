import React, { useEffect } from "react";
import { useState } from "react";

function Selectcategory() {
    let [categories, setCategories] = useState([])
    let [input, setInput] = useState("")


    //Function that handles the submit click once the user selects the category
    function handleSubmit(event) {
        event.preventDefault();
        let userInput = event.target.selectcategoryOption.value
        console.log("Selected the category :", userInput)
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
                    <button type="submit">Start</button>
                </form>
            </div>
        </>
    )
}

export default Selectcategory;