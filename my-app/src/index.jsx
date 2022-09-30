import React from 'react';
import ReactDOM from 'react-dom/client';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import  {Login} from '../src/Pages/Login/Login.jsx'
import {Ordenes} from './Pages/Waiter View/Ordenes.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Ordenes" element={<Ordenes />} />
            <Route path="/Order" element={<div>Estoy en otro componente</div>} />
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
    </BrowserRouter>
)
 









// ReactDOM.createRoot(document.getElementById('root')).render(
//     < React.StrictMode >
//             {/*<Login />*/}
//             <Navbar/>
//         </React.StrictMode >
    // )