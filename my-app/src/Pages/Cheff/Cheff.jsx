import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from '../../Components/navbar/Navbar.jsx';
import Footer from '../../Components/footer/Footer.jsx';
import './Cheff.css'
import { Login } from "../Login/Login.jsx";


export const Cheff = () => {
    const [activeTable, setActiveTable] = useState([]);
    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();

    const token = localStorage.getItem('token')

    useEffect(() => {
        fetch('http://localhost:3001/orders', {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${token}`
            }
        }).then(response => response.json())
            .then((value) => {
                let tableActive = value.map((element) => ({ "client": element.client, "products": element.products, "dateEntry": element.dateEntry, "dateProcessed": element.dateProcessed, "_id": element._id , "status":element.status}))
                setActiveTable(tableActive)
                console.log('oders =>', tableActive);
            })
    }, [])

    const getOrderById = (id) => {
        const result = activeTable.find(value => {
            return value._id === id
        })
        return result
    }



    const readyToServe = (order) => {
        console.log(order);
        let status =order.status
        console.log(status);
        fetch(`http://localhost:3001/orders/${order._id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(
                {
                    "userId": localStorage.getItem('id'),
                    "client": localStorage.getItem('client'),
                    "products": JSON.parse( localStorage.getItem('cartProducts')).map((value)=> ({productId: value.id, qty: value.quantity})),
                    "status":status,
                }
            )
        }).then(response => response.json())
          .then(value => {
            const oderPrepared = value
            setOrders(oderPrepared)
            console.log(orders);

        })
        .catch((error) => console.log(error))
    }



    const showPrepared = () => {
        console.log(orders);
        // let includesBreakFast = products.filter(products => products.type === 'cena')
        // setCurentProducts(includesBreakFast)
        console.log("click");

    };

    return (
        <>
            <Navbar />

            <div className='container-btn'>
                <button type='button' className='break-btn'  >Activos</button>
                <button type='button' className='dinner-btn' onClick={() => showPrepared()}>Preparados</button>
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
                        <button className="btn-serve" onClick={() => readyToServe(order)}>Listo para Servir</button>
                    </div>
                ))}
            </div>
            <Footer />
        </>


    );
}
