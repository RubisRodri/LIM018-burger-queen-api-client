import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from '../../Components/navbar/Navbar.jsx';
import Footer from '../../Components/footer/footer.jsx';
import './Cheff.css'

export const Cheff = () => {
    const [activeTable, setActiveTable] = useState([]);
    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();

    const token = localStorage.getItem('token')

    useEffect(() => {
        fetch('http://localhost:3001/orders?', {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => response.json())
            .then((value) => {
                 let tablePending = value.filter(element => element.status ==="pending")
                 let tableActive = tablePending.map((element) => ({ "client": element.client, "products": element.products, "dateEntry": element.dateEntry, "dateProcessed": element.dateProcessed, "status": element.status, "_id": element._id }))
                 console.log(tableActive)
                // const newOrderPending = tableActive.filter(element => element.status === "pending")
                // console.log('PENDING:', newOrderPending)
                setActiveTable(tableActive)
            })
      
    }, [orders])

    // const onlyPrepared = () => {
    //     const pending = orders.filter((item) => item.status === "hola")
    //     console.log(pending)
    // }
    // onlyPrepared();




    const getOrderById = (id) => {
        const result = activeTable.find(value => {
            return value._id === id
        })
        return result
    }

    const readyToServe = (order) => {
        console.log(order)

        fetch(`http://localhost:3001/orders/${order._id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(
                order
            )
        }).then(response => response.json())
            .then(value => {
                const oderPrepared = value
                console.log(oderPrepared);
                setOrders(oderPrepared)
            })
            .catch((error) => console.log(error))
    }


    const showPrepared = () => {
        console.log("click");
        navigate("/Prepared")
    };

    return (
        <>
            <Navbar />

            <div className='container-btn'>
                <button type='button' className='dinner-btn' onClick={showPrepared}>Preparados</button>
            </div>

            <h2 className="text-orders">Ordenes Pendientes</h2>
            
                <div className="order-div">
                    {activeTable.map((order, index) => (
                        <div className="order-products" key={index}>
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


