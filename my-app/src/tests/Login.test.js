import { render, screen } from '@testing-library/react'
import Login, { handleSubmit } from '../Pages/Login/Login.jsx'



describe('Login', () => {
    it('Renders inputs', () => {
        render({handleSubmit});
        const emailInput = screen.getByPlaceholderText('');
        const passInput = screen.getByPlaceholderText('');

        expect(emailInput).toBeInTheDocument(false);
        expect(passInput).toBeInTheDocument(false)
    });
})