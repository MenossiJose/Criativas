import { useState, useEffect } from "react"
import { TextField, Button, ButtonGroup } from "@mui/material"
import authServices from "../../services/auth"
import {useNavigate} from 'react-router-dom'

export default function Auth() {

    const navigate = useNavigate()
    const authData = JSON.parse(localStorage.getItem('auth'))

    const [formType, setFormType] = useState('login')
    const [formData, setFormData] = useState(null)
    const { login, signup, authLoading } = authServices()
    

  

    useEffect(() => {
        if(authData){
            return navigate('/profile')
        }
    }, [])


    const handleChangeFormType = () => {
        setFormData(null)
        if (formType === 'login') {
            setFormType('signup')
        } else {
            setFormType('login')
        }
    }

    const handleFormDataChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()

        switch (formType) {
            case 'login':
                login(formData)
                break
            case 'signup':
                if (formData.password !== formData.confirmPassword) {
                    console.log('As senhas não são iguais')
                    console.log(formData.password, formData.confirmPassword)
                    return
                }
                signup(formData)
                break
        }
    }

    if (authLoading) {
        return (<h1>Carregando...</h1>)
    }


    return (

        <>
            {formType === 'login' ? (


                <>
                    <h1>Login</h1>
                    <button onClick={handleChangeFormType}>Não possui uma conta?</button>
                    <form onSubmit={handleSubmitForm}>
                        <TextField
                            required
                            label="E-mail"
                            type="email"
                            name="email"
                            onChange={handleFormDataChange}
                        />
                        <TextField
                            required
                            label="Senha"
                            type="password"
                            name="password"
                            onChange={handleFormDataChange}
                        />

                        <Button type="submit">Login</Button>
                    </form>

                </>

            ) : null}

            {formType === 'signup' ? (
                <>
                    <h1>Cadastro</h1>
                    <button onClick={handleChangeFormType}>Ja possui uma conta?</button>
                    <form onSubmit={handleSubmitForm}>
                        <TextField
                            required
                            label="Nome completo"
                            type="fullname"
                            name="fullname"
                            onChange={handleFormDataChange}
                        />
                        <TextField
                            required
                            label="E-mail"
                            type="email"
                            name="email"
                            onChange={handleFormDataChange}
                        />
                        <TextField
                            required
                            label="Senha"
                            type="password"
                            name="password"
                            onChange={handleFormDataChange}
                        />
                        <TextField
                            required
                            label="Confirmar senha"
                            type="password"
                            name="confirmPassword"
                            onChange={handleFormDataChange}
                        />

                        <Button type="submit">Cadastrar</Button>
                    </form>
                </>
            ) : null}
        </>
    )

}