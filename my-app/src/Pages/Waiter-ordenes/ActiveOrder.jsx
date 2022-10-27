import React from "react";
import { Navbar } from "../../Components/navbar/Navbar";
import { Navigate } from "react-router-dom";
import Footer from '../../Components/footer/Footer.jsx';
import mesas from "../../Pictures/mesas.png"
import './ActiveOrder.css';
import { useState } from "react";
import { useEffect } from "react";
import {getOrderActive} from '../../service-api/service-api.js'

export const ActiveOrder = () => {
    const [activeTable, setActiveTable] = useState([]);

    useEffect(() => {
        getOrderActive()
            .then((value) => {
                let tableActive = value.map((element) => ({ "client": element.client, "products": element.products }))
                setActiveTable(tableActive)
            })
    }, [])


    return (
        <>
            <Navbar />
            <div className="container-active-tables">
                <div className="active-tables">
                    {activeTable.map((element, index) =>
                        <div className="tb" key={index}>
                            <p>{element.client}</p>
                            <img src={mesas} className="table" />
                        </div>
                    )}
                

                </div>
            </div>
            <Footer />
        </>
    )
}