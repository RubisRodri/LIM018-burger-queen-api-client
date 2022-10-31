import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from '../../Components/navbar/Navbar.jsx';
import Footer from '../../Components/footer/footer.jsx';
import { useEffect, useState } from "react";
import './employess.css';

export const Employess = () =>{
    const[employess, setEmployess] = useState([]);
    const[users, setUsers] = useState([])

    const result = () => {
        fetch('http://localhost:3001/users', {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then((value) => {
                console.log("este es el resultado", value)
            
            })
            
            //console.log("este es el resultado", employess)
    }
    
    useEffect(() => {
        result()
    }, users)

    return(
        <>
         <Navbar />
        <span>Soy el componente empleados</span>
         <div className="Contenedor-employess">
                <div className="employess">
                    <p>soy el cuadrado gris</p>
                </div>
        </div>
        <Footer />
        </>
    )
}