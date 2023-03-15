import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { Login } from '../src/Pages/Login/Login.jsx';
import { Waiter } from '../src/Pages/Waiter/Waiter-option/Waiter-option.jsx';
import { Ordenes } from '../src/Pages/Waiter/orders/Orders.jsx';
import {ActiveOrder} from '../src/Pages/Waiter-ordenes/ActiveOrder.jsx';
import { Cheff } from '../../my-app/src/Pages/Cheff/Cheff.jsx';
import { Prepared } from '../../my-app/src/Pages/Prepared/Prepared.jsx';
import { Admin } from '../../my-app/src/Pages/Admin/Admin.jsx';
import { Employess } from './Pages/Employess/Employess.jsx';


ReactDOM.createRoot(document.getElementById('root'))
    .render(
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/Waiter" element={<Waiter />} />
                    <Route path="/Ordenes" element={<Ordenes />} />
                    <Route path="/ActiveOrder" element={<ActiveOrder />} />
                    <Route path="/Cheff" element={<Cheff />} />
                    <Route path="/Prepared" element={<Prepared />} />
                    <Route path="/Admin" element={<Admin />} />
                    <Route path="/Employess" element={<Employess />} />
                </Routes>
        </BrowserRouter>
    )
