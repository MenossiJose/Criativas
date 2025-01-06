import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    Flex,
    Link as ChakraLink,
    useToast,
} from "@chakra-ui/react";
import * as yup from 'yup';
import { useState, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import authServices from "../../services/auth";
import { authSchema } from "./schema";
import logo from "../../assets/logo.png";

const Auth = () => {

    const navigate = useNavigate();
    const toast = useToast();
    const authData = JSON.parse(localStorage.getItem("auth"));

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const { login } = authServices();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (authData) {
            navigate("/home");
        }
    }, [authData, navigate]);

    const handleFormDataChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        console.log("FormData enviado:", formData);
        setLoading(true);
        setErrors({});

        try {
            await authSchema.validate(formData, { abortEarly: false });

            const success = await login(formData);

            if (success) {
                toast({
                    title: "Login efetuado com sucesso!",
                    position: "top-right",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                navigate("/landing");
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
    };

    return (
        <Flex
            bg="#a54367"
            w="100vw"
            h="100vh"
            justify="center"
            align="center"
            fontFamily="Arial, sans-serif"
        >
            <Flex
                bg="#d9d9d9"
                p="1.25rem"
                borderRadius="0.5rem"
                boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
                w={{ base: "90%", sm: "700px" }}
                maxW="800px"
                textAlign="center"
                alignItems="center"
                display="flex"
                flexDirection="column"
                minH="900px"
            >
                <img
                    src={logo}
                    alt="logo"
                    className="logo"
                    style={{ width: "clamp(100px, 30%, 165px)", margin: "2.85rem auto" }}
                />

                <form
                    onSubmit={handleSubmitForm}
                    style={{ padding: "1.25rem", marginBottom: "1.25rem" }}
                >
                    {/* Campo de e-mail */}
                    <FormControl
                        isInvalid={!!errors.email}
                        w="100%"
                        mb="1.925rem"
                        textAlign="center"
                    >
                        <FormLabel
                            fontSize="clamp(1rem, 2vw, 1.5rem)"
                            fontWeight="bold"
                            color="#cb8c26"
                            mb="0.3125rem"
                        >
                            E-mail
                        </FormLabel>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormDataChange}
                            textAlign="left"
                            p="0.625rem"
                            borderRadius="0.625rem"
                            fontSize="clamp(1rem, 2vw, 1.5rem)"
                            w={{ base: "100%", sm: "380px" }}
                            border="none"
                            bg="white"
                            _focus={{
                                outline: "2px solid #cb8c26",
                            }}
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>

                    {/* Campo de senha */}
                    <FormControl
                        isInvalid={!!errors.password}
                        mb="1.925rem"
                        textAlign="center"
                    >
                        <FormLabel
                            fontSize="clamp(1rem, 2vw, 1.5rem)"
                            fontWeight="bold"
                            color="#cb8c26"
                            mb="0.3125rem"
                        >
                            Senha
                        </FormLabel>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleFormDataChange}
                            textAlign="left"
                            p="0.625rem"
                            borderRadius="0.625rem"
                            fontSize="clamp(1rem, 2vw, 1.5rem)"
                            maxW="400px"
                            w={{ base: "100%", sm: "380px" }}
                            border="none"
                            bg="white"
                            _focus={{
                                outline: "2px solid #cb8c26",
                            }}
                        />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>

                    {/* Botão de login */}
                    <Button
                        type="submit"
                        isLoading={loading}
                        bg="#cb8c26"
                        color="white"
                        fontSize="clamp(1rem, 1.5vw, 1.375rem)"
                        p="0.625rem"
                        h="2.875rem"
                        w="clamp(180px, 30%, 200px)"
                        borderRadius="0.825rem"
                        mt="0.625rem"
                        _hover={{ bg: "#f9bb58" }}
                    >
                        {loading ? "Entrando..." : "ENTRAR"}
                    </Button>
                </form>

                {/* Botão de registro */}
                <ChakraLink
                    as={RouterLink}
                    to="/signup"
                    mt="1.25rem"
                    w="clamp(180px, 30%, 200px)"
                >
                    <Button
                        bg="#cb8c26"
                        color="white"
                        fontSize="clamp(1rem, 1.5vw, 1.375rem)"
                        p="0.625rem"
                        h="2.875rem"
                        w="clamp(180px, 30%, 200px)"
                        borderRadius="0.825rem"
                        mt="0.625rem"
                        _hover={{ bg: "#f9bb58" }}
                    >
                        REGISTRAR
                    </Button>
                </ChakraLink>

                {/* Link de esquecimento de senha */}
                <ChakraLink
                    to="/forgot-password"
                    mt="5.625rem"
                    fontSize="clamp(1rem, 1.5vw, 1.375rem)"
                    color="#CB8C26"
                    _hover={{ textDecoration: "underline" }}
                >
                    Esqueceu sua senha?
                </ChakraLink>
            </Flex>
        </Flex>
    );
};

export default Auth;
