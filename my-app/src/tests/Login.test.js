import { getByTestId, render, screen } from '@testing-library/react'
import { Login } from '../Pages/Login/Login.jsx'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
//import { create } from "react-test-renderer";

    describe("<Login />", () => {
        it("Renderiza correctamente", () =>{
            const component = render(<Login />, {wrapper: BrowserRouter});
            expect(component).toBeDefined();
        })
    })






// describe('Login', () => {
//     it('Renders inputs', () => {
//         const {debug} = render(<Login />, {wrapper: BrowserRouter})
//         const form = screen.getByTestId('login-form')
//         const email = screen.getByTestId('txtcorreo')
//         const password = screen.getByTestId('password')
//         const buttonsend = screen.getByTestId('login-submit')
//         expect(screen.getByTestId('login-form')).toHaveTextContent()

//        // debug()

//     });
// })
