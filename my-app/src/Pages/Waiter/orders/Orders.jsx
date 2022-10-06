import React, { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import { Navbar } from '../../../Components/navbar/Navbar.jsx'
import Footer from '../../../Components/footer/Footer.jsx'
import './Orders.css'



export const Ordenes = () => {
    const [products, setProducts] = useState([]);
    const [curentproducts, setCurentProducts] = useState([])
    //const cartProducts = createContext();


    const [cartItems, setCartItems] = useState(() => {
        try {
            const productLocalStorage = localStorage.getItem('cartProducts')
            return productLocalStorage ? JSON.parse(productLocalStorage) : []
        } catch (error) {
            return [];
        }
    });
    // eslint-disable-next-line no-unused-expressions
    useEffect(() => {
        localStorage.setItem("cartProducts", JSON.stringify(cartItems))
    }, [cartItems])


    const addToCart = (product) => {
        // buscar dentro del cartItems si el elemento existe, cambiar la cantidad a cantidad+1, si no existe, agregarlo al arreglo
        const existInCart = cartItems.find((value) => {
            return value.id === product.id
        })
        if (existInCart) {
            const newArray = cartItems.map((element) => {
                if (element.id === product.id) {
                    return { ...product, quantity: element.quantity + 1 }
                }
                return element;
            })
            setCartItems(newArray)
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }])
        }


        console.log(`  card items => ${cartItems}`);
        console.log(typeof (cartItems));
    }

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
                let includesBreakFast = orderProducts.filter(products => products.type === 'desayuno')
                setCurentProducts(includesBreakFast)

            })

    }, []);

    const showDinnerFood = () => {
        let includesBreakFast = products.filter(products => products.type === 'cena')
        setCurentProducts(includesBreakFast)

    }

    const showBreakFastFood = () => {
        let includesBreakFast = products.filter(products => products.type === 'desayuno')
        setCurentProducts(includesBreakFast)

    }

    return (
        <>
            <Navbar />
            <div className='container-btn'>
                <button type='button' className='break-btn' onClick={showBreakFastFood} >Desayuno</button>
                <button type='button' className='dinner-btn' onClick={showDinnerFood} >Cena</button>
            </div>

            <div className="containerMenu">

                {curentproducts.map((element) =>
                    <div className="container-menu" key={element.id}>
                        <img src={element.image} className="image" />
                        <p >{element.product}</p>
                        <p>S/ {element.price}</p>
                        <div>
                            <button data-id={element.id} className="add-product" onClick={() => addToCart(element)}>Agregar</button>
                        </div>
                    </div>
                )}
        


            <div className="add-product-total">
                {cartItems.map((element) =>
                    <div key={element.id}>
                        <p>{element.quantity}</p>
                        <p>{element.product}</p>
                        <p>S/ {element.price}</p>
                    </div>
                )}
                <button className="send-kitchen">Enviar a Cocina</button>
            </div>

            </div>
            <Footer />
        </>

    )
};































/*
    const CartProvider = ({ children }) => {
 
        // eslint-disable-next-line no-unused-expressions
 
 
 
        const deleteItemToCart = (product) => {
            const inCart = CartItems.find(
                (productIntCart => productIntCart.id === product.id)
            );
 
            if (inCart.amount === 1) {
                SetCartItems(
                    CartItems.filter(productIntCart => productIntCart.id !== product.id)
                )
            }else{
                SetCartItems((productIntCart) => {
                    if (productIntCart.id == product.id) {
                        return { ...inCart, amount: inCart.amount - 1 }
                    } else {
                        return productIntCart
                    }
                });
            }
        };
 
        return 
        )
    }
*/
