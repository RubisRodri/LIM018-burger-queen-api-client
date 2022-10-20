import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from '../../Components/navbar/Navbar.jsx';
import Footer from '../../Components/footer/Footer.jsx';
import './Cheff.css'


export const Cheff = () => {
    const [activeTable, setActiveTable] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/orders', {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => response.json())
            .then((value) => {
                let tableActive = value.map((element) => ({ "client": element.client, "products": element.products, "dateEntry": element.dateEntry, "dateProcessed": element.dateProcessed }))
                setActiveTable(tableActive)
            })
    }, [])

    useEffect(()=>{
        const preparedOrder = (e) => {
            e.prevent.defaul()
            const requestPrepared = {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  })
            };
            const preparedTable = fetch('http://localhost:3001/orders',requestPrepared)
            .then(response => response.json())
            .then(data => console.log(data));
        }
    })



    return (
        <>
            <Navbar />

            <div className='container-btn'>
                <button type='button' className='break-btn'  >Activos</button>
                <button type='button' className='dinner-btn' >Preparados</button>
            </div>

            <h2 className="text-orders">Ordenes</h2>
            <div className="container-Orders">
                {activeTable.map((order, index) => (
                    <div key={index}>
                        <p>{order.client}</p>
                        <p>Recibido: {order.dateEntry}</p>
                        {order.products.map((product, index) => (
                            <div key={index} className="div-products">
                                <p className="text-product">({product.qty})</p>
                                <p className="text-product">{product.product.name}</p>
                            </div>
                        ))}
                        <button className="btn-serve">Listo para Servir</button>
                    </div>
                ))}
            </div>
            <Footer />
        </>


    );
}
