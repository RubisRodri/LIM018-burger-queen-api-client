import React, { useState, useEffect } from "react";
import { Navbar } from '../../Components/navbar/Navbar.jsx';
import Footer from '../../Components/footer/footer.jsx';
import './admin.css'

export const Admin = () => {
    //const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isShown, setIsShown] = useState(true);
    const [curentSelectedproduct, setCurentSelectedproduct] = useState({});

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
                setProducts(value)



            })
    }, [])



    const showProduct = (product) => {
        setCurentSelectedproduct(product);
        setIsShown(current => !current);
        console.log(curentSelectedproduct);
    }




    return (

        <>
            <Navbar />

            <div className="contenedor-btn">
                <div className='container-btn'>
                    <button type='button' className='break-btn' >Productos</button>
                    <button type='button' className='dinner-btn' >Empleados</button>
                </div>


            </div>
            <div className="container-product-admin" >
                {products.map((element) =>
                    <div className="product-admin" key={element.id} onClick={() => showProduct(element)}>
                        <p className="name-product-a">{element.name}</p>
                    </div>
                )}

                <div className="current-product" style={{display: isShown ? 'none' : 'block'}}>
                    <div className="product-content">
                    <img className="image-pproduct-admin" src={curentSelectedproduct.image}/>
                    <p>{curentSelectedproduct.name}</p>
                    <p>Precio: {curentSelectedproduct.price} S/</p>
                    <p>Id:  {curentSelectedproduct.id}</p>
                    <button className="add-product-admin">Editar producto</button>
                    <button className="add-product-admin">Eliminar producto</button>
                    </div>
                    
                </div>
            </div>



            <Footer />
        </>

    )
}