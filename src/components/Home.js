import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"
import Carousel from "./Carousel"
import { json } from "react-router";
function Home() {


    return (
        <>
            <div className="main">
                <Navbar></Navbar>
                <Carousel></Carousel>
            </div>
        </>
    )
}

export default Home;