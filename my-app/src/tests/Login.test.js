import Login,{handleSubmit}from '../Pages/Login/Login.jsx'

describe('pruebas en Login', () => {
    test('Login debe retornar un objeto ', () => {
        const user = handleSubmit();
        console.log(user);
    })
})