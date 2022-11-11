const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const cors = require('cors');
const products = router.db
    .get('products')
    .value()
server.use(jsonServer.bodyParser)
server.use(middlewares)
server.use(cors())
const tokenWaiter = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQiLCJuYW1lIjoiRmVsaXBlIE1lbmRvemEiLCJlbWFpbCI6ImZtZW5kb3phQGdtYWlsLmNvbSIsInJvbGUiOiJ3YWl0ZXIifQ.7Cr4Ub_bWoT0npL2d0sArOCCTNZmu8-pKycd3V3tTzY";
const tokenCheff = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQiLCJuYW1lIjoiSm9oZW4gU2FudG9zIiwiZW1haWwiOiJqb2hlbkBnbWFpbC5jb20iLCJyb2xlIjoiY2hlZmYiLCJhbGciOiJIUzI1NiJ9.jnI2kiJV1K1jK6VC6zd76wMWnuNcP6ZcxRRZpJNaOEY";
const tokenAdmin = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQiLCJuYW1lIjoiRGVsZWluYSBMTGFtb2NjYSIsImVtYWlsIjoiZGVsZWluYUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImFsZyI6IkhTMjU2In0.VFOAUrXQEyhJg-_yW0a6SWvU4dfxtkoU5nBz1dFMAhQ";

server.use((req, res, next) => {
    if (req.method === 'POST' && req.path === '/auth') {
        next();
    } else if (req.headers.authorization === `Bearer ${tokenWaiter}` || `Bearer${tokenAdmin}` || `Bearer${tokenCheff}`) {
        if (req.path === '/orders' && req.method === 'POST') {
            if (req.body.products.length === 0 || req.body.userId === undefined) {
                res.status(400).send('Bad request');
            }
        }
        next();
    } else {

        res.sendStatus(401);
    }
});
server.post("/auth", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const datosUsers = [{
        email: 'fmendoza@gmail.com',
        password: '123456'
    },
    {
        email: 'johen@gmail.com',
        password: '123456'
    },
    {
        email: 'deleina@gmail.com',
        password: '123456'
    }
    ];
    //(el => el._id === orderId )
    const userExist = datosUsers.find(value => value.email === email);
    if (!userExist) {
        res.status(400).send("usuario no existe en la db");
        return
    }
    const passwordIsValid = userExist.password === password
    if (!passwordIsValid) {
        res.status(400).send("Crendenciales incorrectas");
        return
    }

    // eslint-disable-next-line default-case
    switch (req.body.email) {
        case 'fmendoza@gmail.com':
            res.jsonp({
                token: tokenWaiter
            });
            console.log("waiter");
            break;
        case "johen@gmail.com":
            res.jsonp({
                token: tokenCheff
            });
            console.log("Cheff");
            break;
        case 'deleina@gmail.com':
            res.jsonp({
                token: tokenAdmin
            });
            console.log("Admin");
            break;
    }

});
server.post("/orders", async (req, res) => {
    try {
        const productsFronEnd = req.body.products;
        console.log(productsFronEnd);
        const getProductById = (id) => {
            const result = products.find(product => {
                return product.id === id
            })
            return result
        }
        const mapedProsucts = productsFronEnd.map((value) => {
            const objNew = {
                qty: value.qty,
                product: getProductById(value.productId)
            }
            return objNew
        })
        const id = "id" + Math.random().toString(16).slice(2)
        const order = {
            "_id": id,
            "userId": req.body.userId,
            "client": req.body.client,
            "products": mapedProsucts,
            "status": "pending",
            "dateEntry": new Date().toLocaleTimeString(),
            "dateProcessed": ""
        }
        const orders = router.db.get('orders')
        const resolve = await orders.push(order).write()
        res.status(200).json({
            order
        })
    } catch (error) {
        res.status(400).send("No se indica Id, o se intenta crear una orden sin productos")
        res.status(401).send("No hay cabecera de autenticación")
    }
}
)
server.put("/orders/:id", async (req, res) => {
    try {
        const productsFronEnd = req.body.products;
        console.log(productsFronEnd)
        const getProductById = (id) => {
            const result = products.find(product => {
                return product.id === id
            })
            return result
        }
        const mapedProsucts = productsFronEnd.map((value) => {
            const objNew = {
                qty: value.qty,
                product: getProductById(value.product.id)
            }
            return objNew
        })
        //console.log("=>",mapedProsucts);
        const ordersUpdate = {
            "_id": req.params.id,
            "client": req.body.client,
            "userId": req.body.userId,
            "products": mapedProsucts,
            "status": req.body.status = "prepared",
            "dateEntry": req.body.dateEntry,
            "dateProcessed": new Date().toLocaleTimeString()
        }
        const ordersP = router.db.get('orders')
        console.log('ORDERS', ordersP)
        ordersP.__wrapped__.orders = ordersP.__wrapped__.orders.filter(value => {
            return value._id !== req.params.id
        });
        console.log('ORDER PUT', ordersUpdate);
        ordersP.__wrapped__.orders.push(ordersUpdate);
        await ordersP.write();
        //const resolve = await ordersP.push(ordersUpdate).write
        res.status(200).json(ordersUpdate)
    } catch (error) {
        console.log(error.stack);
        res.status(400).send("Crendenciales incorrectas");
    }
});

server.patch("/orders/:id", async (req, res) => {
    const orderId = req.params.id
    console.log("hola", orderId)
    const changes = req.body
    const ordersP = router.db.get('orders')
    const order = ordersP.__wrapped__.orders.find(el => el._id === orderId)// orden que consiguio
    if (!order) {
        res.status(404).send("Not found");
        return
    }
    ordersP.__wrapped__.orders = ordersP.__wrapped__.orders.filter(value => {
        return value._id !== orderId
    });
    const orderUpdated = {
        ...order,
        ...changes
    }
    ordersP.__wrapped__.orders.push(orderUpdated);
    await ordersP.write();
    res.status(200).send(orderUpdated)
});


server.delete("/users/:id", async (req, res) => {
    const userId = req.params.id
    const changes = req.body
    const userP = router.db.get('users');
    const user = userP.__wrapped__.users.find(el => el.id === userId)// orden que consiguio
    console.log("holaaaaa", user)
    if (!user) {
        res.status(404).send("Not found");
        return
    }
    userP.__wrapped__.users = userP.__wrapped__.users.filter(value => {
        return value.id !== userId
    });
    await userP.write();
    res.status(200).send(userP)
})

server.patch("/users/:id", async (req, res) => {
    const userId = req.params.id
    console.log("hola", userId)
    const changes = req.body
    const userP = router.db.get('users');
    //console.log("holaaaa", userP)
    const user = userP.__wrapped__.users.find(el => el.id === userId)// orden que consiguio
    console.log("holaaaaa", user)
    if (!user) {
        res.status(404).send("Not found");
        return
    }
    userP.__wrapped__.users = userP.__wrapped__.users.filter(value => {
        return value.id !== userId
    });
    const userUpdated = {
        ...user,
        ...changes
    }
    userP.__wrapped__.users.push(userUpdated);
    await userP.write();
    res.status(200).send(userUpdated)
})


server.delete("/products/:id", async (req, res) => {
    const productId = req.params.id
    const changes = req.body
    console.log('product id',productId)
    const productP = router.db.get('products');
    console.log('product p',productP)

    const product = productP.__wrapped__.products.find(value => value.id !== productId)

    console.log('product...',product);
    if (!product) {
        res.status(404).send("Not found");
        return
    }
    productP.__wrapped__.products = productP.__wrapped__.products.filter(value => {
            return value.id !== productId
        });
    
   
    await productP.write();
    res.status(200).send(productP)
})






server.use(router)
server.listen(3001, () => {
    console.log('JSON Server is running')
    console.log("servidor iniciado en el puerto 3001")
})