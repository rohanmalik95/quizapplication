import React from "react";
import Navbar from "./components/Navbar.js"
import Carousel from "./components/Carousel.js"
import Home from "./components/Home.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./components/design.css"
import Category from "./components/Category.js"
import Selectcategory from "./components/Selectcategory.js";
import { createContext } from "react";
import Userinput from "./context/UserinputState.js"
function App() {
  return (
    <>
    <Userinput>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home></Home>} />
          <Route path="/addquestion" element={<Category></Category>}/>
          <Route path="/selectcategory" element={<Selectcategory></Selectcategory>}/>
        </Routes>
      </BrowserRouter>
    </Userinput>
    </>
  );
}

export default App;
