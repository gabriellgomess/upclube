import { useState, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { FloatLabel } from "primereact/floatlabel";
import { Toast } from 'primereact/toast';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useRef(null);
    const navigate = useNavigate();

    // No LoginPage.jsx

const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await login(email, password);
    
    if (response.success) {
        navigate('/dashboard');  // Redireciona para o dashboard após login bem-sucedido
    } else {
        showError(response.error);  // Exibe a mensagem de erro retornada pelo backend
    }
};


    const showError = (errorMessage) => {
        if (toast.current) {
            toast.current.show({ severity: 'error', summary: 'Erro', detail: errorMessage, life: 3000 });
        }
    };

    return (
        <div className="login-container">
            <Toast ref={toast} />
            <form id="form-login" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="field">
                    <FloatLabel>
                        <InputText
                            style={{ width: "225px" }}
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email">Email</label>
                    </FloatLabel>
                </div>
                <div className="field">
                    <FloatLabel>
                        <Password
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            feedback={false}
                            toggleMask
                        />
                        <label htmlFor="password">Senha</label>
                    </FloatLabel>
                </div>
                <Button label="Entrar" type="submit" />
            </form>
            <Link to="/">                
                <Button label="Página Inicial" className="p-button-text"/>
            </Link>
        </div>
    );
};

export default LoginPage;
