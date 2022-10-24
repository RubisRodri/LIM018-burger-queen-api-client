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


server.use((req, res, next) => {
    if (req.method === 'POST' && req.path === '/auth') {
        next();
    } else if (req.headers.authorization === `Bearer ${tokenWaiter}` || req.headers.authorization === `Bearer ${tokenCheff}`) {
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
    }
    ];
    const userExist = datosUsers.find(value => req.body.email === value.email);
    if (!userExist) {
        res.status(400).send("usuario no existe en la db");
        return

    }
    const passwordIsValid = userExist.password === req.body.password
    if (!passwordIsValid) {
        res.status(400).send("Crendenciales incorrectas");
        return

    }


    if (req.body.email === 'fmendoza@gmail.com') {
        res.jsonp({
            token: tokenWaiter
        });
        console.log('waiter');
    } else {
        res.jsonp({
            token: tokenCheff
        });
        console.log('cheff');
    }

    //res.status(200).json(datosUsers);

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

        //console.log("=>",mapedProsucts);

        const ordersUpdate = {
            "_id": req.params.id,
            "userId": req.body.userId,
            "products": mapedProsucts,
            "status": req.body.status = "prepared",
            "dateEntry": new Date().toLocaleTimeString(),
            "dateProcessed": ""
        }

        const ordersP = router. db.get('orders')
        console.log('ORDERS',ordersP)

        ordersP.__wrapped__.orders = ordersP.__wrapped__.orders.filter(value=>{
            return value._id !== req.params.id
        });

        ordersP.__wrapped__.orders.push(ordersUpdate);
        await ordersP.write();


        //const resolve = await ordersP.push(ordersUpdate).write
        res.status(200).json(ordersUpdate)
    } catch (error) {
        console.log(error.stack);
        res.status(400).send("Crendenciales incorrectas");
    }

});

server.use(router)
server.listen(3001, () => {
    console.log('JSON Server is running')
    console.log("servidor iniciado en el puerto 3001")
})




