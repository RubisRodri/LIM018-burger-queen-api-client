import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../Components/navbar/Navbar";
import Footer from '../../Components/footer/Footer.jsx';


export const Chefview = () => {
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
                let tableActive = value.map((element) => ({ "client": element.client, "products": element.products }))
                setActiveTable(tableActive)
            })
    }, [])



    // const totalTable = [
    //     { client: "Mesa 1" },
    //     { client: "Mesa 2" },
    //     { client: "Mesa 3" },
    //     { client: "Mesa 4" },
    //     { client: "Mesa 5" },
    //     { client: "Mesa 6" }
    // ]

    // const ShowbusyTables = () => {
    //     let mapedTotalTable = totalTable.map(value => (value.client));
    //     let includesTable = activeTable.filter(element => element.client === mapedTotalTable);
    //     settotalTables(includesTable)
    // }
    // const ShowunoccupiedTables = () => {
    //     let mapedTotalTable2 = totalTable.map(value => (value.client));
    //     let includesTable2 = activeTable.filter(element => {
    //        if (element.client != mapedTotalTable2) {
    //         return mapedTotalTable2
    //        } 
    //     });
    //     settotalTables(includesTable2)

    // }

    // const mapedProducts= activeTable.map(element => (element.products))
    // //const mapedProduct = mapedProducts.map(element => ([1]===element.product))
    // console.log(mapedProducts);


    return (
        <>
            <Navbar />

            <div className='container-btn'>
                <button type='button' className='break-btn' onClick={""} >Activos</button>
                <button type='button' className='dinner-btn' onClick={""} >Preparados</button>
            </div>

            <Footer />
        </>
    )
}
