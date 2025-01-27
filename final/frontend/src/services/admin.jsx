import { useState } from "react";

const adminServices = () => {
    const [userLoading, setUserLoading] = useState(false);
    const url = 'http://localhost:3000/users';

    const getUser = async (userId) => {
        setUserLoading(true);
        try {
            const response = await fetch(`${url}/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            });
            if (!response.ok) {
                throw new Error('Erro ao obter usuário');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error getting user:', error);
            return null;
        } finally {
            setUserLoading(false);
        }
    };

    const deleteUser = async (userId) => {
        setUserLoading(true);
        try {
            const response = await fetch(`${url}/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            });
            if (!response.ok) {
                throw new Error('Erro ao deletar usuário');
            }
            return true;
        } catch (error) {
            console.error('Error deleting user:', error);
            return false;
        } finally {
            setUserLoading(false);
        }
    };

    return { getUser, deleteUser };
}
export default adminServices;
