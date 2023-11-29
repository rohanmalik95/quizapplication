import react from "react";

function Category() {
    return (
        <>
            <div className="main">
                <div className="add-form">
                    <form >
                        <label>
                            Question:
                            <input type="text" name="question" id="question"></input>
                        </label>

                        <lablel>
                            Option A:
                            <input type="text" name="optionA" id="optionA"></input>
                        </lablel>

                        <label>
                            Option B:
                            <input type="text" name="optionB" id="optionB"></input>
                        </label>

                        <label>
                            Option C:
                            <input type="text" name="optionC" id="optionC"></input>
                        </label>

                        <lable>
                            Option D:
                            <input type="text" name="optionD" id="optionD"></input>
                        </lable>

                        <label>
                            Answer Option:
                            <input type="text" name="answer" id="answer"></input>
                        </label>

                        <select id="category" name="category">
                            <option type="text" value="playstation">Playstation</option>
                            <option type="text" value="sony">Sony</option>
                        </select>

                        <button>Add Question</button>
                    </form>
                </div>


                <div className="add=remove">
                    <div className="add-button">
                        +
                    </div>
                    <div className="remove-button">
                        -
                    </div>
                </div>
                
            </div>


        </>
    )
}

export default Category;
