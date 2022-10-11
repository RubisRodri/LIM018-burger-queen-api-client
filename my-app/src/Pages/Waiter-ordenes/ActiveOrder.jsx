import React from "react";
import { Navbar } from "../../Components/navbar/Navbar";
import { Navigate } from "react-router-dom";
import Footer from '../../Components/footer/Footer.jsx';
import mesas from "../../Pictures/mesas.png"
import './ActiveOrder.css';

export const ActiveOrder = () =>{
   
   
   
   
    return(
        <>
        <Navbar />
        <div className="contenedor-mesas">
        <div className="mesas-activas">mesa 1<img src={mesas} className="table" /></div>
        <div className="mesas-activas">mesa 2<img src={mesas} className="table"/></div>
        <div className="mesas-activas">mesa 3<img src={mesas} className="table"/></div>
        <div className="mesas-activas">mesa 4<img src={mesas} className="table"/></div>
        <div className="mesas-activas">mesa 5<img src={mesas} className="table"/></div>
        <div className="mesas-activas">mesa 6<img src={mesas} className="table"/></div>
        </div>
        <Footer />
        </>
    )
}