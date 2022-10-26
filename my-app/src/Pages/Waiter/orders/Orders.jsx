import React, { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import { Navbar } from '../../../Components/navbar/Navbar.jsx';
import btnadd from '../../../Pictures/add.png';
import menos from '../../../Pictures/menos.png'
import dump from '../../../Pictures/dump.png'
import Footer from '../../../Components/footer/Footer.jsx';
import Swal from 'sweetalert2';
import Select from 'react-select';
import './Orders.css';



export const Ordenes = () => {
    const API_URL = 'http://localhost:3001/'

    const [products, setProducts] = useState([]);
    const [curentproducts, setCurentProducts] = useState([]);
    const [selectTable, setSelecTable] = useState(null);

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
  

     // peticion htpp para enviar la orden 
    const sendOrder =() =>{

        let sendKichen= fetch(`${API_URL}orders`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "id":`${localStorage.getItem('id')}`
            },
            body: JSON.stringify(
                {
                    "userId": localStorage.getItem('id'),
                    "client": localStorage.getItem('client'),
                    "products": JSON.parse( localStorage.getItem('cartProducts')).map((value)=> ({productId: value.id, qty: value.quantity})),
                }
            )
        }) .then(res => res.json())
        .then(value => {
            const id=value
            console.log(id);
        }
            
            )
            seeModal()
    }

  

    const showDinnerFood = () => {
        let includesBreakFast = products.filter(products => products.type === 'cena')
        setCurentProducts(includesBreakFast)

    };

    const showBreakFastFood = () => {
        let includesBreakFast = products.filter(products => products.type === 'desayuno')
        setCurentProducts(includesBreakFast)

    };

    const arrayTable = [
        { label: "Mesa 1", value: "Mesa 1" },
        { label: "Mesa 2", value: "Mesa 2" },
        { label: "Mesa 3", value: "Mesa 3" },
        { label: "Mesa 4", value: "Mesa 4" },
        { label: "Mesa 5", value: "Mesa 5" },
        { label: "Mesa 6", value: "Mesa 6" }
    ]

    const handleSelectTable = ({value}) => {
        setSelecTable(value)
        localStorage.setItem('client', value);
    }

    const sumTotal = () => {
        const reducer =(acumulador, currentValue) => acumulador + currentValue.price;
    }


    const seeModal = () => {
        Swal.fire({
            icon: 'success',
            title: 'Envio exitoso',
            text: 'Su pedido fue enviado a la cocina',
            confirmButtonColor: "#DD6B55"
          })
    }
    

    // let totalPrice = 0 
    // products.forEach(element => {
    //     const item = element;
    //     console.log(totalPrice += item.price);
    //     totalPrice += item.price
    // } )


    return (
        <>
            <Navbar />
         <div className="contenedor-general">
            <div className='container-btn'>
                <button type='button' className='break-btn' onClick={showBreakFastFood} >Desayuno</button>
                <button type='button' className='dinner-btn' onClick={showDinnerFood} >Cena</button>
                <label className="mesas"></label>
                <Select className="mesas-activas"
                 options = {arrayTable}
                 onChange = {handleSelectTable}
                  
                />
            </div>
                <div className="contenedor-order">
                    {curentproducts.map((element) =>
                        <div className="container-menu" key={element.id}>
                            <img src={element.image} className="image" />
                            <p className="nombreProduct">{element.product}</p>
                            <p>S/ {element.price}</p>
                            <div className="button-order">
                                <button data-id={element.id} className="delete-product" onClick={() => subtractItemToCart(element)}><img className ="btnadd" src={menos}/></button>
                                <button data-id={element.id} className="add-product" onClick={() => addToCart(element)}><img className ="btnadd" src={btnadd}/></button>
                            </div>
                        </div>
                    )}
                 </div>

                    <div className="add-product-total">
                        <div className="form-text">
                        </div>
                        {cartItems.map((element) =>
                            <div className="order-text" key={element.id}>
                                <p className="elemen-text">{element.quantity}   {element.product}    S/{element.price}</p>
                                <button data-id={element.id} className="delete-order" onClick={() => deleteItemToCart(element)}>
                                    <img className="dump-order" src={dump}/>
                                </button>
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
