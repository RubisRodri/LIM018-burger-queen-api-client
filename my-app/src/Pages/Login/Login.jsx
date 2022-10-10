import React, { useState } from 'react';
import banner from '../../Pictures/banner.png';
import logo from '../../Pictures/logo.png';
import './Login.css';
import { useNavigate } from "react-router-dom";


export const Login = () => {
    const API_URL = 'http://localhost:3001/'
    const navigate = useNavigate()

    const [datos, setDatos] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        let newDatos = { ...datos, [name]: value };
        setDatos(newDatos);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (e.target === 0) {
            console.log('no enviar');
        } else {
            let res = await fetch(`${API_URL}auth`, {
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
                })
        }

    };
    return (
        <>
        <div className='bg' >
        <div className="container-form-login">
            <div className='form-login'>
            <div className="image-login">
                <img className='logo-image' src={logo} />
            </div>
            <form className="form" onSubmit={handleSubmit} >
                <h2 className='welcome'>Bienvenido</h2>
                <p className='sesion-login'>Inicia sesión con tu cuenta</p>
                <label className='label-email' for="email">Email</label>
                <input  className='input-email' placeholder="Ingresa tu email" type="text" name="email" id="txtcorreo" onChange={handleInputChange} />

                <label className='label-password' for="password">Password</label>
                <input className='input-password' placeholder="Ingresa tu contraseña" type="password" name="password" id="txtpassword" onChange={handleInputChange} />
                <a href="#" className='forget-password'>¿Olvidaste tu contraseña?</a>

                <div className="input-login">
                    <input className='btn-login' type="submit" value="Login" />
                </div>
            </form>
            </div>
            
        </div>
        </div>
       
        </>
           
    )
}