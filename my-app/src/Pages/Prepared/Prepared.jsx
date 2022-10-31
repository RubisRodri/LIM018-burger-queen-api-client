import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from '../../Components/navbar/Navbar.jsx';
import Footer from '../../Components/footer/footer.jsx';
import { useEffect, useState } from "react";
import './prepared.css';

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
        })
            .then(response => response.json())
            .then((value) => {
                const orderPrepared = value.map((value) => ({ dateEntry: value.dateEntry, status: value.status, product: value.products, client: value.client }))
                console.log('PREPAREDado', value);
                setPrepared(value)
            })
            .catch(error => console.log(error))
    }, [])

    const showPending = () => {
        console.log("click");
        navigate("/Cheff")
    };
    console.log(prepared)
    return (
        <>
            <Navbar />
            <div className='container-btn'>
                <button type='button' className='break-btn' onClick={showPending}>Activos</button>
            </div>
            <h2 className="text-pending">Ordenes Preparadas</h2>
                <div className="order-prepared">
                    {prepared.map((order, index) => (
                        <div className="list-prepared" key={index}>
                            <p>{order.status}</p>
                            <p>Tiempo de preparación: {order.dateProcessed}</p>
                            {order.products.map((product, index) => (
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

