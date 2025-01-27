import {
    Flex,
    FormControl,
    FormErrorMessage,
    Text,
    Textarea,
    Input,
    Button,
    useToast,
} from "@chakra-ui/react"
import * as yup from 'yup';
import { useState } from "react"
import ideaServices from "../../services/idea"
import { useNavigate } from 'react-router-dom'
import SimpleNavbar from "../../components/navbar/navbar"
import { cardSchema } from "./schema";

const Idea = () => {

    const navigate = useNavigate()
    const toast = useToast();

    const { createIdea } = ideaServices()
    const user = JSON.parse(localStorage.getItem("auth"))?.user._id

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
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

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        console.log("FormData enviado:", formData);
        setLoading(true);
        setErrors({});

        try {
            await cardSchema.validate(formData, { abortEarly: false });

            const success = await createIdea(formData);

            if (success) {
                toast({
                    title: "Ideia criada com sucesso!",
                    position: "top-right",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                console.log("FormData enviado no sucess:", formData);
                setFormData({ category: "", text: "", user: user })
                navigate("/home");
            }

        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const validationErrors = {};
                error.inner.forEach((err) => {
                    validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
            } else {
                toast({
                    title: "Erro inesperado",
                    position: "top-right",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } finally {
            setLoading(false);
        }

    }

    return (

        <Flex
            direction="column"
            bg="#D9D9D9"
            h="100vh"
            overflow="auto">

            <SimpleNavbar />

            <Flex
                mt="5"
                ml="5">

                <form onSubmit={handleSubmitForm}>

                    <Text
                        fontSize="28px"
                        fontWeight="bold"
                    >
                        Cadastrar Ideia</Text>

                    <FormControl
                        isInvalid={!!errors.category}
                        mt="4"
                        mb="5">
                        <Input
                            type="text"
                            bg="white"
                            placeholder="Categoria"
                            name="category"
                            h="60px"
                            w="331px"
                            value={formData.category}
                            onChange={handleFormDataChange}
                        />
                        <FormErrorMessage>{errors.category}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                        isInvalid={!!errors.text}>
                        <Textarea
                            type="text"
                            name="text"
                            bg="white"
                            w="565px"
                            minH="200px"
                            placeholder="Descrição"
                            value={formData.text}
                            onChange={handleFormDataChange}
                        />
                        <FormErrorMessage>{errors.text}</FormErrorMessage>
                    </FormControl>

                    <Button
                        type="submit"
                        isLoading={loading}
                        bg="#cb8c26"
                        color="white"
                        fontSize="clamp(1.405rem, 1.8vw, 1.275rem)"
                        fontWeight="bold"
                        p="0.625rem"
                        h="2.875rem"
                        w="clamp(180px, 30%, 200px)"
                        borderRadius="0.825rem"
                        mt="2.625rem"
                        _hover={{ bg: "#f9bb58" }}
                    >
                        {loading ? "Enviando..." : "CADASTRAR"}
                    </Button>

                </form>

            </Flex>

        </Flex>
    )

}

export default Idea;
