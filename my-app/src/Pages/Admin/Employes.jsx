import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from '../../Components/navbar/Navbar.jsx';
import Footer from '../../Components/footer/Footer.jsx';


export const Employees = () => {
    

    return (

        <>
            <Navbar />

           <h1>Empleados</h1>
            <Footer />
        </>

    )
}