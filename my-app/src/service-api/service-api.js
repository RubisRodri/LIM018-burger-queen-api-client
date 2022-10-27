//obtener productos
export const getProducts = () =>
    fetch('http://localhost:3001/products', {
        method: "GET",
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(response => response.json())



export const sendkichen = () => {
    fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "id": `${localStorage.getItem('id')}`
        },
        body: JSON.stringify(
            {
                "userId": localStorage.getItem('id'),
                "client": localStorage.getItem('client'),
                "products": JSON.parse(localStorage.getItem('cartProducts')).map((value) => ({ productId: value.id, qty: value.quantity })),
            }
        )
    }).then(res => res.json())
}


//active-orders
export const getOrderActive = () => {
  
}

//prepared
export const getOrderPrepared = () => 
    fetch('http://localhost:3001/orders?status=prepared', {
        method: "GET",
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(response => response.json())
