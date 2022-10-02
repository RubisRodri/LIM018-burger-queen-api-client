import React,{ useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import { Navbar } from '../../Components/navbar/Navbar.jsx'
import Footer from '../../Components/footer/Footer.jsx'
import { BtnBreakDinner } from '../../Components/buton/breakfast-dinner.jsx'
import cafeA from '../../../Pictures/cafeA.png'
import cafeLeche from '../../../Pictures/cafe-con-leche.png'
import jugo from '../../../Pictures/jugo-de-frutas.png'
import sandwich from '../../../Pictures/sandwich-de-queso.png'
import './Ordenes.css'



export const Ordenes = () => {
   
    const [list, setList] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:3001/products', {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
       .then(response => response.json())
       .then((value)=>{
        console.log(value);
        setList(value)});
    }, []);

    
    return (
        <>
            <Navbar />
            <div> soy un componente para tomar las ordenes</div>
            <BtnBreakDinner />

            {list.map(product => 
       <div key={product.id}>{product.name}</div>)}
            <section className="container-break1">
                <div className="menu">
                    <img src={cafeA} className="img" />
                    <p className="p-menu"> Cafe Americano </p>
                </div>
                <div className="menu">
                    <img src={cafeLeche} className="img" />
                    <p className="p-menu"> Cafe con Leche</p>
                </div>
            </section>
            <section className="container-break2">
                <div className="menu">
                    <img src={jugo} className="img" />
                    <p className="p-menu">jugo de frutas</p>
                </div>
                <div className="menu">
                    <img src={sandwich} className="img" />
                    <p className="p-menu">Sandwich de Queso</p>
                </div>

            </section>
            <button className="btn-menu">BEBIDAS</button>

            <section className="container-orders">
                <p className="p-orders">ejemplo precio</p>
                <p className="p-orders">ejemplo precio</p>
                <button className="btn-orders"> Enviar a Cocina </button>
            </section>

            <Footer />
        </>

    )
};

