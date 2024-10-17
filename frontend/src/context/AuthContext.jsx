import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

// No AuthContext.js

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Verifica se o usuário já está logado (por exemplo, token no sessionStorage)
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            axios.defaults.headers.Authorization = `Bearer ${token}`;
            axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/profile`)
                .then(response => {
                    setUser(response.data.data); // Defina o usuário autenticado
                })
                .catch(() => {
                    sessionStorage.removeItem('token');
                });
        }
        setLoading(false);
    }, []);

    // Função de login
    const login = async (email, password) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/login`, { email, password });
            sessionStorage.setItem('token', response.data.token);
            axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
            setUser(response.data.data);
            return { success: true }; // Retorna sucesso
        } catch (error) {
            return { success: false, error: error.response.data.message }; // Retorna o erro ao invés de lançar
        }
    };

    // Função de logout
    const logout = () => {
        axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/logout`).then(() => {
            sessionStorage.removeItem('token');
            setUser(null);
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
