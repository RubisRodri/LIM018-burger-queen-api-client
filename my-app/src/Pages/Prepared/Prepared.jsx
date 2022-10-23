import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from '../../Components/navbar/Navbar.jsx';
import Footer from '../../Components/footer/Footer.jsx';
import { useEffect, useState } from "react";

export const Prepared = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const [prepared, setPrepared] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/orders?status=prepared', {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => response.json())
            .then((value) => {
                const orderPrepared = value.map((value)=> ({dateEntry: value.dateEntry, status: value.status, product: value.products}))
                console.log(orderPrepared)
                setPrepared(orderPrepared)
            }).catch(error => console.log(error))
    }, [])


    return (
        <>
            <Navbar />

            <h1>Ordenes Preparadas</h1>
            <div className="container-prepared">
                {prepared.map((order, index) => (
                    <div key={index}>
                        <p>{order.status}</p>
                        <p>Recibido: {order.dateEntry}</p>
                        {order.product.map((product, index) => (
                            <div key={index} className="div-products">
                                <p className="text-product">({product.qty})</p>
                                <p className="text-product">{product.product.name}</p>
                             </div> 
                           ))}
                     </div>
                 ))}    
             </div>
                        
        <Footer />
        </>
                )

}

