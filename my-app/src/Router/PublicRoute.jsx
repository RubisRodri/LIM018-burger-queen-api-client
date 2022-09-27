import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Waiter } from '../Pages/Waiter/Waiter-option.jsx';
{/*import { Login } from '../Pages/Login/Login.jsx'*/}


function Route() {
    return (
        <div className="Route">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Waiter />} />
                    {/*<Route exact path="/" element={<Login/>}/>*/}

                </Routes>
            </BrowserRouter>
        </div>
    )
}


