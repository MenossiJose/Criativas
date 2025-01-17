import { useState, useEffect } from "react"
import { TextField, Button, Alert } from "@mui/material"
import ideaServices from "../../services/Idea"
import { redirect, useNavigate } from 'react-router-dom'

export default function Idea() {

    const navigate = useNavigate()

    const { ideasLoading, getUsersIdeas, createIdea } = ideaServices()
    const user = JSON.parse(localStorage.getItem("auth"))?.user._id
    const [formData, setFormData] = useState({
        category: "",
        text: "",
        user: user || "",
    })
   

    
    const handleFormDataChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        createIdea(formData)
        setFormData({ category: "", text: "", user: user })
    }

    return (

        <>

            {user ? (
                <>
                    <h1>Cadastrar Ideia</h1>

   

            <form onSubmit={handleSubmitForm}>
                <TextField
                    required
                    label="Categoria"
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleFormDataChange}
                />
                <TextField
                    required
                    label="Ideia"
                    type="text"
                    name="text"
                    value={formData.text}
                    onChange={handleFormDataChange}
                />
       
                <Button type="submit">Cadastrar</Button>
            </form>
            </>
            ) : (
                <>
                    <h1>Ideias</h1>
                    <p>Para cadastrar uma ideia, você precisa estar logado</p>
                </>
            )}


        </>
    )

}