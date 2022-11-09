import React, { useState, useEffect } from "react";
import { Navbar } from '../../Components/navbar/Navbar.jsx';
import Footer from '../../Components/footer/footer.jsx';
import { useNavigate } from "react-router-dom";
import agregar from '../../Pictures/agregar.png'
import './admin.css';


export const Admin = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [user, setUser] = useState([]);
    const [isShown, setIsShown] = useState(true);
    const [curentSelectedproduct, setCurentSelectedproduct] = useState({});


    useEffect(() => {
        fetch('http://localhost:3001/products', {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then((value) => {
                setProducts(value)
            })
    }, [])
    const showEmployess = () => {
        navigate("/Employess")
        console.log("navegar a empleados")
    }



    const showProduct = (product) => {
        setCurentSelectedproduct(product);
        setIsShown(current => !current);
    }


    const deleteProduct = (id) => {
        
 

    }


    return (

        <>
            <Navbar />

            <div className="content">
                <div className='container-btn-admin'>
                    <button type='button' className='products-btn'>Productos</button>
                    <button type='button' className='employes-btn' onClick={showEmployess} >Empleados</button>

                </div>
            </div>
            <div className="container-product-admin" >
                {products.map((element) =>
                    <div className="product-admin" key={element.id} onClick={() => showProduct(element)}>
                        <p className="name-product-a">{element.name}</p>
                    </div>
                )}

                <div className="current-product" style={{ display: isShown ? 'none' : 'block' }}>
                    <div className="product-content">
                        <img className="image-pproduct-admin" src={curentSelectedproduct.image} />
                        <p>{curentSelectedproduct.name}</p>
                        <p>Precio: {curentSelectedproduct.price} S/</p>
                        <p>Id:  {curentSelectedproduct.id}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}



