import { useState } from "react";

export default function authServices() {
    const [authLoading, setAuthLoading] = useState(false)

    const url = 'http://localhost:3000/auth'

    const login = async (formData) => {
        setAuthLoading(true);
        try {
            const response = await fetch(`${url}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            console.log("Resposta do backend:", result);

            if (response.ok && result.success && result.body.token) {
                localStorage.setItem(
                    "auth",
                    JSON.stringify({
                        token: result.body.token,
                        user: result.body.user,
                    })
                );
                return true;
            }
            return false;
        } catch (error) {
            console.error("Erro na requisição:", error);
            throw error;
        } finally {
            setAuthLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('auth')
    }

    const signup = async (formData) => {
        setAuthLoading(true);
        try {
            const response = await fetch(`${url}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            console.log("Resposta do backend:", result);

            if (!response.ok) {
                throw new Error('Erro ao criar conta');
            }
            return true;

        } catch (error) {
            console.error('Erro no signup:', error);
            return false; // Indica falha

        } finally {
            setAuthLoading(false);
        }
    };


    return { login, logout, signup, authLoading }
}