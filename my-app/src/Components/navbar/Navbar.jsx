import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import exitImg from '../../Pictures/exit.png'
import logo from '../../Pictures/logo.png'
import './navbar.css'


export const Navbar = ()=> {
    const navigate = useNavigate();
    const exist=()=>{
        navigate("/")
    }
    return (
        <section>
            <div className="navbar">
                <div className="containerCenter">
                    <div className="logo"><img src={logo} className="logoImg" /></div>
                </div>
                <div className="containerRigth">
                    <div className="exit"><img src={exitImg} className="exittImg"  onClick={exist}/></div>
                </div>
            </div>
        </section>
    )
}


