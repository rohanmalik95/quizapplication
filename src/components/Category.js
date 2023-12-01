import react, { useEffect } from "react";
import { useState } from "react";

function Category() {

    let [display, setDisplay] = useState(true)
    let [display2, setDisplay2] = useState(false)
    let [categories, setCategories] = useState([])
    console.log("")

    //Function to handle the handleclick in the form
    async function handleclick(event) {
        event.preventDefault();
        let question = event.target.question.value
        let optionA = event.target.optionA.value
        let optionB = event.target.optionB.value
        let optionC = event.target.optionC.value
        let optionD = event.target.optionD.value
        let answer = event.target.answer.value
        let category = event.target.category.value


        let payload = {
            "question": question,
            "A": optionA,
            "B": optionB,
            "C": optionC,
            "D": optionD,
            "Answer": answer,
            "category": category
        }
        await addquestion(payload);
        document.location.reload();
    }

    //Function to call the add question API
    async function addquestion(x) {
        let data = await fetch("http://127.0.0.1:5001/addquestion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(x)
        });
        let dataJson = await data.json()
        console.log("API response is  :", dataJson)
    }

    //function to handle the click on remove category
    function removebuttonclick(event2) {

        event2.preventDefault();
        console.log("Clicked on the reomve category button !")
        setDisplay(!display)
        setDisplay2(!display2)
    }

    //function to handle the click on the add category button
    function addbuttonclick(event3) {
        event3.preventDefault();
        console.log("Clicked on the add category button !")
        setDisplay(!display)
        setDisplay2(!display2)
    }

    //Function to handle the add category submit button click
    async function addcategorySubmit(event5) {
        event5.preventDefault();
        console.log("Submit clicked on the add category button")
        let addcat = event5.target.newcategory.value;
        console.log("Adding new category ! : ", addcat)
        let payload = {"name":addcat}
        await addcategoryAPI(payload)
        document.location.reload();
    }

    //Function to handle the remove category submit click
    async function removecategorySubmit(event4) {
        event4.preventDefault()
        console.log("Submit clicked on the remove category button")
        let removecat = event4.target.removecategory.value;
        console.log("removing the category ", removecat)
        let payload = {"name":removecat}
        await removecategoryAPI(payload)
        document.location.reload();
    }

    //Function with the api call to  handle the addcategory click
    async function addcategoryAPI(x) {
        console.log("handling the add category click api")
        let addData = await fetch("http://127.0.0.1:5001/addcategory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(x)
        });
        let jsonaddData = await addData.json()
        console.log(jsonaddData)
    }

    //Function with the API to handle the remove category click by the user
    async function removecategoryAPI(x) {
        console.log("handling the remove category click api")
        let removeData = await fetch("http://127.0.0.1:5001/deletecategory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(x)
        });
        let removeJson = await removeData.json();
        console.log(removeJson)
    }





    //THe use effect function will only run on the first render and fetchl all the categories in the database

    useEffect(() => {
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
            <div className="main" style={{ display: display ? "block" : "none" }}>
                <div className="add-form">
                    <form onSubmit={handleclick}>
                        <label>
                            Question:
                            <input type="text" name="question" id="question"></input>
                        </label>

                        <label>
                            Option A:
                            <input type="text" name="optionA" id="optionA"></input>
                        </label>

                        <label>
                            Option B:
                            <input type="text" name="optionB" id="optionB"></input>
                        </label>

                        <label>
                            Option C:
                            <input type="text" name="optionC" id="optionC"></input>
                        </label>

                        <label>
                            Option D:
                            <input type="text" name="optionD" id="optionD"></input>
                        </label>

                        <label>
                            Answer Option:
                            <input type="text" name="answer" id="answer"></input>
                        </label>

                        <label>Category:

                            <select id="category" name="category">
                                {categories.map((i) => {
                                    return (<option type="text" value={i}>{i}</option>)
                                })}
                            </select>
                        </label>

                        <button type="submit" id="addquestion">Add Question</button>
                    </form>
                </div>

            </div>
            <div className="headingadd-remove" >
                <h2> Add or remove category </h2>

                <div className="add-remove-div">
                    <div className="add-button" onClick={addbuttonclick}>
                        +
                    </div>

                    <div className="remove-button" onClick={removebuttonclick}>
                        -
                    </div>

                </div>
            </div>
            <div className="addcategory-details" style={{ display: display2 ? "block" : "none" }}>
                <form onSubmit={addcategorySubmit}>
                    <input type="text" name="newcategory"></input>
                    <button id="addbutton" type="submit">
                        Add Category
                    </button>
                </form>
            </div>

            <div className="removecategory-details" style={{ display: display2 ? "block" : "none" }}>
                <form onSubmit={removecategorySubmit}>
                    <label>Category
                        <select id="category" name="removecategory">
                            {categories.map((i) => {
                                return (<option type="text" value={i}>{i}</option>)
                            })}
                        </select>
                    </label>
                    <button id="removebutton" type="submit">Remove Category</button>
                </form>
            </div>


        </>
    )
}

export default Category;
