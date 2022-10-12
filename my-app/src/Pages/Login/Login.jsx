import React, { useState } from 'react';
//import banner from '../../Pictures/banner.png';
//import logo from '../../Pictures/logo.png';
import './Login.css';
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const API_URL= 'http://localhost:3001/';
    const navigate = useNavigate();
    const [datos, setDatos] = useState({
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessages] = useState(false);

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        let newDatos = { ...datos, [name]: value };
        setDatos(newDatos);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (datos.email=== '' || datos.password === '') {
            alert('Por Favor Complete sus Email y/o Password')
            document.getElementById('txtcorreo').value ='';
            document.getElementById('txtpassword').value ='';
            document.getElementById('txtcorreo').focus();
        }else{
            let res = fetch(`${API_URL}auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        }).then(res => res.json())
          .then((data) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('nombre', data.nombre)
            localStorage.setItem('id', data.id)
            navigate("/Waiter")
          }).catch(error => setErrorMessages(true))
        } 
    };
        return (
         <div className="contenedor-formulario contenedor">
             <div className="imagen-formulario">
                <img src={''}/>
             </div>
            <form className="formulario"onSubmit={handleSubmit} >
             <div className="texto-formulario">
                <h2>Bienvenido de nuevo</h2>
                <p>Inicia sesión con tu cuenta</p>
             </div>
                <div className="input">
                <label for="usuario">Email</label>
                <input placeholder="Ingresa tu email" type="text" name="email" id="txtcorreo"onChange={handleInputChange}/>
             </div>
             <div className="input">
                <label for="contraseña">Password</label>
                <input placeholder="Ingresa tu contraseña" type="password"name="password" id="txtpassword"onChange={handleInputChange}/>
             </div>
             <div className="password-olvidada">
                <a href="#">¿Olvidaste tu contraseña?</a>
             </div>
             {errorMessage?
                <label className='errorMessage'>Por favor verifique su email y Password</label>:""}
             <div className="input">
                <input type="submit" value="Login"/>
             </div>
            </form>
         </div>
    )
}






