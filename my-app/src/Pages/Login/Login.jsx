import React, { useState } from 'react';
import banner from '../../Pictures/banner.png';
import logo from '../../Pictures/logo.png';
import './Login.css';
import { useNavigate } from "react-router-dom";




export const Login = () => {
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

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (e.target === 0) {
            console.log('no enviar');
        } else {
            let res = await fetch("http://localhost:3001/auth", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            }).then(res => res.json())
              .then((data) => {
                localStorage.setItem('token', data.token)
                localStorage.setItem('nombre', data.nombre)
                navigate("/Waiter")
              })
        }
        
    };
        
    return (
        <section className='login'>
            <div className='banner'>
            </div>
            <img src={banner} className="imageBanner" />
            <div className='formLogin'>
               <div className='logo'>
                    <img src={logo} className='logoimg' />
                </div>
                <div className='sesion'>
                    <span>Inicio de sesion</span>
                </div>
                <form onSubmit={handleSubmit} className="forn-login">
                    <input type="text" className="login-email" id="txtcorreo" name="email" placeholder="Correo" onChange={handleInputChange} />
                    <br />
                    <input type="password" className="login-password" id="txtpassword" name="password" placeholder="Contraseña" onChange={handleInputChange} />
                    <br />
                    <button type="submit" className="login-btnLogin" >Ingresar</button>
                </form>
            </div>
        </section>
    )
}
