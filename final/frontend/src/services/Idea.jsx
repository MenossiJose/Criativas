import { useState } from "react";

export default function ideasServices() {
    const [ideasLoading, setIdeasLoading] = useState(false)

    const url = 'http://localhost:3000/ideas'

    const getUsersIdeas = (userId) => {
        setIdeasLoading(true);
        return fetch(`${url}/userIdeas/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
                return [];
            })
            .finally(() => {
                setIdeasLoading(false);
            });
    };

    const createIdea = async (formData) => {
        setIdeasLoading(true)

        try {
            const response = await fetch(`${url}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            console.log("Resposta do backend:", result);

            if (!response.ok) {
                throw new Error('Erro ao criar ideia');
            }
            return true;

        } catch (error) {
            console.error('Erro na criação:', error);
            return false; // Indica falha

        } finally {
            setIdeasLoading(false);
        }
    }

    const getAllIdeas = () => {
        setIdeasLoading(true);

        return fetch(`${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then((response) => response.json())
            .then((result) => {
                setIdeasLoading(false);
                return result;
            })
            .catch((error) => {
                setIdeasLoading(false);
                console.log(error);
                return [];
            });
    };

    const likeIdea = async (id, user) => {
        try {
            const response = await fetch(`${url}/${id}/like`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ id, user }),
            });
            const result = await response.json();
            return result.updatedIdea; // Certifique-se de retornar a ideia atualizada
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const deleteIdea = async (ideaId) => {
        setIdeasLoading(true);
        try {
            const response = await fetch(`${url}/${ideaId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            });
            return response.ok;
        } catch (error) {
            console.error('Error deleting idea:', error);
            return false;
        } finally {
            setIdeasLoading(false);
        }
    };

    const getAllComments = async (id) => {
        try {
            const response = await fetch(`${url}/${id}/comment`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar comentários');
            }

            const result = await response.json();
            console.log("Comentários retornados:", result);

            // Verifique se a resposta é um array de comentários
            if (Array.isArray(result)) {
                return result; // Retorne o array de comentários diretamente
            } else {
                console.error("Nenhum comentário encontrado na resposta:", result);
                return [];
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    const addComment = async (ideaId, user, text) => {
        try {
            const response = await fetch(`${url}/${ideaId}/comment`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({ id: ideaId, user, text }),
            });

            console.log("Resposta bruta da API:", response);

            let responseBody = null;
            if (response.headers.get("Content-Length") !== "0") {
                responseBody = await response.json();
            }

            console.log("Corpo da resposta da API:", responseBody);

            if (!response.ok) {
                throw new Error(responseBody?.message || "Erro ao adicionar comentário");
            }

            if (responseBody?.comments) {
                setComments(responseBody.comments);
            } else {
                console.error("Nenhum comentário retornado pela API.");
            }

            console.log("Comentário adicionado com sucesso:", responseBody);
        } catch (error) {
            console.error("Erro ao adicionar comentário:", error);
        }
    };


    const deletComment = async (id, commentId) => {
        try {
            const response = await fetch(`${url}/${id}/comment/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
            const result = await response.json();
            return result.updatedIdea; // Certifique-se de retornar a ideia atualizada
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const editComment = async (id, comment, text) => {
        try {
            const response = await fetch(`${url}/${id}/comment/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ id, comment, text }),
            });
            const result = await response.json();
            return result.updatedIdea; // Certifique-se de retornar a ideia atualizada
        } catch (error) {
            console.log(error);
            throw error;
        }
    };




    return { ideasLoading, getUsersIdeas, createIdea, getAllIdeas, deleteIdea, likeIdea, getAllComments, addComment, deletComment, editComment }
}