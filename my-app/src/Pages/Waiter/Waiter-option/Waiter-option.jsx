import React from 'react';
import { Navbar } from '../../../Components/navbar/Navbar.jsx';
import add from '../../../Pictures/add.png';
import waiter from '../../../Pictures/waiter-serving.png';
import Footer from '../../../Components/footer/Footer.jsx';
import { useNavigate } from 'react-router-dom';
import './Waiter-option.css';


export function Waiter() {
    let name = localStorage.getItem('nombre')

    const navigate = useNavigate()

    function sendOrdenes(e) {
        navigate("/Ordenes")
    };

    function sendActiveOrder(e) {
       navigate("/ActiveOrder")
    };


    return (
        <>
            <Navbar />
            <h2 className='textName'>{`Bienvenido ${name} !!`}</h2>
            <div className='container'>
                <button className='btn-add' >
                    <img className='img-add' src={add} />
                    <span className='textN' id="textN" onClick={sendOrdenes}>New order</span>
                </button>
                <button className='btn-waiter' >
                    <img className='img-waiter' src={waiter} />
                    <span className='textA' id="textA" onClick={sendActiveOrder}>Active orders</span>
                </button>
            </div>
            <Footer />
        </>
    )
}



