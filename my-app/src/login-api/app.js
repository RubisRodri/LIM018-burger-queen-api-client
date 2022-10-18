const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const cors = require('cors');

const products = router.db
    .get('products')
    .value()

const secret = "aBdshdbbAsdjjbdjdbjhbsabdnef6466164684";

server.use(jsonServer.bodyParser)
server.use(middlewares)
server.use(cors())
server.use((req, res, next) => {
    console.log(req);
    if (req.method === "POST" && req.path === "/auth") {
        next();
    } else if (req.headers.authorization === `Bearer ${secret}`) {
        next()//  res.sendStatus(200).json(datos)
    } else {
        res.sendStatus(400)
    }
})


server.post("/auth", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email == 'fmendoza@gmail.com' && password == '123456') {
        const datos = {
            id: "123",
            nombre: "Felipe Mendoza",
            email: "fmendoza@gmail.com",
            role:"waiter",
            token: secret,
        }
        res.status(200).json(datos);
    } else {
        res.status(400).send("Crendenciales incorrectas");
    }
});






server.post("/orders", async(req, res) => {
    try {
        const data = req.body;
        console.log("===",req.body.product)
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
        const order = {
            "userId": req.body.userId,
            "client": req.body.client,
            "products": mapedProsucts,
            "order.status": "pending"
        }
        const orders = router.db.get('orders')
        const resolve = await orders.push(order).write()

        console.log('obj =>', resolve)
        res.status(200).json({
            order
        })
    } catch (error) {
        res.status(400).send("No se indica Id, o se intenta crear una orden sin productos")
        res.status(401).send("No hay cabecera de autenticación")
    }
}
)

server.put("/orders", (req, res) => {
    const email = req.body.email;
    // const password = req.body.password;
    // if (email == 'fmendoza@gmail.com' && password == '123456') {
    //     const datos = {
    //         id: "123",
    //         nombre: "Felipe Mendoza",
    //         email: "fmendoza@gmail.com",
    //         role:"waiter",
    //         token: secret,
    //     }
    //     res.status(200).json(datos);
    // } else {
        //     res.status(400).send("Crendenciales incorrectas");
        // }
    });
    server.get("/options/:id/total",(req, res)=>{
        const datos = [
            {id:1,cliente:"orden 1",total:2500 },
            {id:2,cliente:"orden 2",total:2100 },
            {id:3,cliente:"orden 3",total:200 }
         ];
         res.json(datos);
     });
    
    
    
    
    
    //  server.get("/products/product.id", (req, res) => {
        //     const db =[
//     ],
//     res.json({
    //     })
    //   })


    // //get
    server.use(router)
    server.listen(3001, () => {
        console.log('JSON Server is running')
        console.log("servidor iniciado en el puerto 3001")
    })




