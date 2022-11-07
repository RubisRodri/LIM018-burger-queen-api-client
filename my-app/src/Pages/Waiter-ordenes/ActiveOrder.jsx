import React from "react";
import { Navbar } from "../../Components/navbar/Navbar";
import { Navigate } from "react-router-dom";
import Footer from '../../Components/footer/footer.jsx';
import mesas from "../../Pictures/mesas.png"
import './ActiveOrder.css';
import { useState } from "react";
import { useEffect } from "react";
import {getOrderActive} from '../../service-api/service-api.js'

export const ActiveOrder = () => {
    const [activeTable, setActiveTable] = useState([]);
    const[delivery, setDelivery] = useState([]);

    const token = localStorage.getItem('token')

    useEffect(() => {
        fetch('http://localhost:3001/orders', {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => response.json())

            .then((value) => {
                //let tableActive = value.map((element) => ({ "client": element.client, "products": element.products }))
                let newTable = value.filter((element) => element.status ==="prepared")
                console.log(newTable)
                setActiveTable(newTable)
            })
    }, [delivery])

    const readyToDelivery = (element) =>{
        console.log(element)
        const data = { "status": "delivered"}
         fetch(`http://localhost:3001/orders/${element._id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
          .then((rep) => setDelivery(rep))
          console.log(delivery)

    }
   

    return (
        <>
            <Navbar />
            <div className="container-active-tables">
                <div className="active-tables">
                    {activeTable.map((element, index) =>
                        <div className="tb" key={index}>
                            <p>{element.client}</p>
                            <img src={mesas} className="tables-order" />
                            <p>{element.status}</p>
                            {element.products.map((product, index) => (
                                <div key={index} className="div-products">
                                    <p className="text-product">({product.qty})</p>
                                    <p className="text-product"> ({product.product.name})</p>
                                </div>
                            ))}
                        <button className="btn-serve" onClick={() => readyToDelivery(element)}>Entregado</button>
                        </div>
                    )}
                

                </div>
            </div>
            <Footer />
        </>
    )
}