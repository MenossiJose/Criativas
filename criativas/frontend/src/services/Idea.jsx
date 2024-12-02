import { useState } from "react";

export default function ideasServices() {
    const [ideasLoading, setIdeasLoading] = useState(false)

    const url = 'http://localhost:3000/ideas'

    const getUsersIdeas = (userId) => {
        setIdeasLoading(true)

        fetch(`${url}/userIdeas/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
            .then((response) => response.json())
            .then((result) => {
                    console.log(result)
                
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setIdeasLoading(false)
            })
    }

    const createIdea = (formData) => {
        setIdeasLoading(true)

        fetch(`${url}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(formData)
        })
            .then((response) => response.json())
            .then((result) => {
                    console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setIdeasLoading(false)
            })
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


    return { ideasLoading, getUsersIdeas, createIdea, getAllIdeas}
}