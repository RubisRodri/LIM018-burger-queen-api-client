import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from '../../Components/navbar/Navbar.jsx';
import Footer from '../../Components/footer/footer.jsx';


export const Admin = () => {
    //const navigate = useNavigate();
    const [products, setProducts] = useState([]);

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
                let orderProducts = value.map((product) => { return { id: product.id, image: product.image, product: product.name, price: product.price, type: product.type } });
                setProducts(orderProducts)


            })
    }, [])



    const showEmployees = () => {
        // let includesBreakFast = products.filter(products => products.type === 'cena')
        // setCurentProducts(includesBreakFast)



        console.log("click");
       

    };


    console.log(products);


    return (

        <>
            <Navbar />

            <div className="contenedor-btn">
                <div className='container-btn'>
                    <button type='button' className='break-btn' >Productos</button>
                    <button type='button' className='dinner-btn' onClick={showEmployees}>Empleados</button>
                </div>

               
            </div>
            {/* <div className='container-btn'>
                    <button type='button' className='break-btn' >Agregar Productos</button>
                </div> */}

            <div className="contenedor-order">
                {products.map((element) =>
                    <div className="container-menu" key={element.id}>
                        <img src={element.image} className="image" />
                        <p className="nombreProduct">{element.product}</p>
                    </div>
                )}

            </div>


            <Footer />
        </>

    )
}