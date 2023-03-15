import React, { useState } from 'react';
//import banner from '../../Pictures/banner.png';
//import logo from '../../Pictures/logo.png';
import './Login.css';
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const API_URL = 'http://localhost:3001/';
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
        if (datos.email === '' || datos.password === '') {
            alert('Por Favor Complete sus Email y/o Password')
            document.getElementById('txtcorreo').value = '';
            document.getElementById('txtpassword').value = '';
            document.getElementById('txtcorreo').focus();
        } else {
            let res = fetch(`${API_URL}auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            }).then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then(value => {
                    localStorage.setItem('token', value.token)
                    const token = localStorage.getItem('token');
                   const parsedToken= parseJwt(token)

                    localStorage.setItem('name', parsedToken.name)
                    localStorage.setItem('id', parsedToken.id)
                   
                    if (parsedToken.role === 'waiter') {
                        navigate("/Waiter")
                        console.log("estoy en mesero")
                    }else if(parsedToken.role ==='cheff'){
                        navigate("/Cheff")
                        console.log("estoy en cheff")
                    }else {
                        console.log("soy admon")
                        navigate("/Employess")
                    }
                    
                }).catch(error =>{
                    console.log(error);
                    setErrorMessages(true)
                } )
            
        }
    };


    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);

    };

    
    return (
        <div className="contenedor-formulario contenedor">
            <div className="imagen-formulario">
                <img src={''} />
            </div>
            <form className="formulario" data-testid="login-form" onSubmit={handleSubmit} >
                <div className="texto-formulario">
                    <h2>Bienvenido de nuevo</h2>
                    <p>Inicia sesión con tu cuenta</p>
                </div>
                <div className="input">
                    <label for="usuario">Email</label>
                    <input placeholder="Ingresa tu email" type="text" name="email" id="txtcorreo" data-testid="txtcorreo" onChange={handleInputChange} />
                </div>
                <div className="input">
                    <label for="contraseña">Password</label>
                    <input placeholder="Ingresa tu contraseña" type="password" name="password" id="txtpassword" data-testid="password" onChange={handleInputChange} />
                </div>
                <div className="password-olvidada">
                    <a href="#">¿Olvidaste tu contraseña?</a>
                </div>
                {errorMessage ?
                    <label className='errorMessage'>Por favor verifique su email y Password</label> : ""}
                <div className="input">
                    <input type="submit" data-testid="login-submit" value="Login" />
                </div>
            </form>
        </div>
    )
}






