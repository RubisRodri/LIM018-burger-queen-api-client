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

    return res.status(200).json(datosUsers);

});





server.use(router)
server.listen(3001, () => {
    console.log('JSON Server is running')
    console.log("servidor iniciado en el puerto 3001")
})


