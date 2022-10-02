import React, { useState, useEffect } from "react";
import { CartProvider, useCart } from "react-use-cart";
import { json, useNavigate } from "react-router-dom";
import { Navbar } from '../../../Components/navbar/Navbar.jsx'
import Footer from '../../../Components/footer/Footer.jsx'
import BtnBreakDinner from '../../../Components/buton/breakfast-dinner.jsx'
import './Orders.css'



export const Ordenes = () => {
    const [list, setList] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3001/products', {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then((value) => {
                console.log(value);
                setList(value)
            })

    }, []);


    return (
        <>
            <Navbar />

            <BtnBreakDinner />

            {list.map((product, index) =>
                <> <div key={`id-${index}`} className="container-menu" >
                    <img className="image" src={product.image} />
                    <p className="text-name"> {product.name}</p>
                    <p className="text-price">Precio: S/{product.price}</p>
                </div>
                    <button className="add-product">Agregar</button>
                </>
            )}

            <div className="add-product-total">
                <span> ejemplo     precio</span>
                <span> ejemplo     precio</span>
                <span> ejemplo     precio</span>
                <button className="send-kitchen">Enviar a Cocina</button>
            </div>
            <Footer />
        </>

    )
};

