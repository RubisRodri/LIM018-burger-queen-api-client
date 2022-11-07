import React, { useState, useEffect } from "react";
import { Navbar } from '../../Components/navbar/Navbar.jsx';
import Footer from '../../Components/footer/footer.jsx';
import { useNavigate } from "react-router-dom";
import './admin.css';


export const Admin = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [user, setUser] = useState([]);
    const [isShown, setIsShown] = useState(true);
    const [isShownEmployes, setIsShownEmplyes] = useState(true);
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



    const showProduct = (product) => {
        setCurentSelectedproduct(product);
        setIsShown(current => !current);
        console.log(curentSelectedproduct);
    }

    const showEmployess = () => {
        navigate("/Employess")
        console.log("navegar a empleados")
    }

    useEffect(() => {
        fetch('http://localhost:3001/users', {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then((value) => {
                setUser(value)
            })
    }, [])



    const showEmployes = (users) => {
        setIsShownEmplyes(current => !current);
    }


    const deleteProduct = (product) => {
        const filterProducts = product.filter((value) => {
            return value.id !== product.id
        }); 

        console.log( filterProducts );
 

    }


    return (

        <>
            <Navbar />

            <div className="content">
                <div className='container-btn-admin'>
                    <button type='button' className='products-btn'>Productos</button>
                    <button type='button' className='employes-btn' onClick={() => showEmployes(user)}>Empleados</button>
                </div>
                <div className="add-admin">
                    <img src={agregar} className="add-btn-admin" />
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
                        <button className="add-product-admin" >Editar producto</button>
                        <button className="add-product-admin" onClick={() => deleteProduct(products)}>Eliminar producto</button>
                    </div>
                </div>
            </div>

            <div className="container-list-employes" style={{ display: isShownEmployes ? 'none' : 'block' }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Rol</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((user, index) => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.roles}</td>
                                    <td>{user.name}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>

    )
}