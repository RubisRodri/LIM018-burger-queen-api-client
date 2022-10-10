import React, { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import { Navbar } from '../../../Components/navbar/Navbar.jsx'
import Footer from '../../../Components/footer/footer.jsx';
import './Orders.css'



export const Ordenes = () => {
    const API_URL = 'http://localhost:3001/'

    const [products, setProducts] = useState([]);
    const [curentproducts, setCurentProducts] = useState([])

    const [cartItems, setCartItems] = useState(() => {
        try {
            const productLocalStorage = localStorage.getItem('cartProducts')
            return productLocalStorage ? JSON.parse(productLocalStorage) : []
        } catch (error) {
            return [];
        }
    });
    
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
        localStorage.setItem("cartProducts", JSON.stringify(cartItems))
    }, [cartItems])

    //funcion para agregar productos a la orden
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
    };

    //funcion para disminuir  productos de la orden
    const subtractItemToCart = (product) => {
        const inCart = cartItems.find((value) => {   
            return value.id === product.id
            });
            
        if (inCart.quantity === 1) {
            setCartItems(
                 cartItems.filter(elementInCar => elementInCar.id !== product.id)//aqui se esta eliminando si q=1
            )
        }else if(inCart.quantity > 1){
            const newArray = cartItems.map((element) => {
                if (element.id === product.id) {
                    return { ...product, quantity: element.quantity - 1 }
                 }
                return element;
             })
             setCartItems(newArray)
            }
    };

    //funcion para borrar el producto de la orden
    const deleteItemToCart = (product) => {
            const inCart = cartItems.find((value) => {   
                return value.id === product.id
                });
                
            if (inCart.quantity >= 1) {
                setCartItems(
                     cartItems.filter(elementInCar => elementInCar.id !== product.id)
                )
        }
    }
  

     // peticion htpp para enviar la orden a la cocina
        
    const sendOrder =() =>{
       let valueProduct = cartItems.map((element) =>{
            return element.product
        })
        let sendKichen= fetch(`${API_URL}orders`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "id":`${localStorage.getItem('id')}`
            },
            body: JSON.stringify(
                 {
                    "id": 1,
                   "userId": '',
                   "table": "2",
                   "products": [
                     {
                       "product": "",
                       "price": 5,
                       "qty": 1
                     },
                     {
                       "product": "",
                       "price": 7,
                       "qty": 1
                     }
                   ],
                   "status": "",
                   "dateEntry":"",
                   "dateProcessed":"",
                   "time":""
               }
            )
        }) .then(res => res.json())
          .then((resp) => {console.log(resp)})
    }

   

    const showDinnerFood = () => {
        let includesBreakFast = products.filter(products => products.type === 'cena')
        setCurentProducts(includesBreakFast)

    };

    const showBreakFastFood = () => {
        let includesBreakFast = products.filter(products => products.type === 'desayuno')
        setCurentProducts(includesBreakFast)

    };

    return (
        <>
            <Navbar />
         <div className="contenedor-general">
            <div className='container-btn'>
                <button type='button' className='break-btn' onClick={showBreakFastFood} >Desayuno</button>
                <button type='button' className='dinner-btn' onClick={showDinnerFood} >Cena</button>
                <p>Mesa</p>
                <input clasName="text-num"></input>
            </div>

        
                <div className="contenedor-order">
                    {curentproducts.map((element) =>
                        <div className="container-menu" key={element.id}>
                            <img src={element.image} className="image" />
                            <p >{element.product}</p>
                            <p>S/ {element.price}</p>
                            <div>
                                <button data-id={element.id} className="add-product" onClick={() => addToCart(element)}>Agregar</button>
                                <button data-id={element.id} className="delete-product" onClick={() => subtractItemToCart(element)}>Restar</button>
                            </div>
                        </div>
                    )}

                 </div>

                    <div className="add-product-total">
                        {cartItems.map((element) =>
                            <div className="order-text" key={element.id}>
                                <p className="elemen-text">{element.quantity}</p>
                                <p className="elemen-text">{element.product}</p>
                                <p className="elemen-text">S/ {element.price}</p>
                                <button data-id={element.id} className="delete-product" onClick={() => deleteItemToCart(element)}>Borrar</button>
                            </div>
                        )}
                          <p className="elemen-text"></p>
                        <button className="send-kitchen" onClick={sendOrder}>Enviar a Cocina</button>
                    </div>
            
            </div> 
                <Footer />
            </>
      )
}

















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


// const deleteItemToCart = (product) => {
//     const inCart = cartItems.find((value) => {   
//         return value.id === product.id
//         });
        
//     if (inCart.quantity >= 1) {
//         //console.log("antes",cartItems)
//         setCartItems(
//              cartItems.filter(elementInCar => elementInCar.id !== product.id)
//         )
        
//     }else{
//         setCartItems((cartItems) => {
//             console.log(cartItems)
//             if (cartItems.id === product.id) {
//                 return { ...cartItems, quantity: cartItems.quantity - 1 }
//             } else {
//                 return cartItems
//             }
//         });
//     }

// };


// const token = sessionStorage.getItem('token');
// function parseJwt(jwt) {
//   return JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString());
// }
