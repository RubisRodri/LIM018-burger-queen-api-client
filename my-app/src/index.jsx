import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { Login } from '../src/Pages/Login/Login.jsx'
import { Waiter } from '../src/Pages/Waiter/Waiter-option/Waiter-option.jsx'
import { Ordenes } from '../src/Pages/Waiter/orders/Orders.jsx'
import {ActiveOrder} from '../src/Pages/Waiter-ordenes/ActiveOrder.jsx';
import { Chefview } from '../../my-app/src/Pages/Chefview/Chefview.jsx';


ReactDOM.createRoot(document.getElementById('root'))
    .render(
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/Waiter" element={<Waiter />} />
                    <Route path="/Ordenes" element={<Ordenes />} />
                    <Route path="/ActiveOrder" element={<ActiveOrder />} />
                    <Route path="/Chefview" element={<Chefview />} />

                </Routes>

        </BrowserRouter>
    )






// import React from 'react';
// import ReactDOM from 'react-dom/client';
// //import { render } from "react-dom";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import  {Login} from '../src/Pages/Login/Login.jsx'
// import {Waiter} from '../src/Pages/Waiter/Waiter-option.jsx'




// ReactDOM.createRoot(document.getElementById('root')).render(
//     <BrowserRouter>
//         <Routes>
//             <Route path="/" element={<Login />} />
//             <Route path="/Waiter" element={<Waiter />} />
//             <Route path="/Order" element={<div>Estoy en otro componente</div>} />
//             <Route path="*" element={<Navigate replace to="/" />} />
//         </Routes>
//     </BrowserRouter>
// )
