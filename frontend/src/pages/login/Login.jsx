import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { loginSchema } from "./schema";
import UserContext from "../../providers/UserContext";
import logo from "../../assets/logo.png";

const Login = () => {
  const { userLogin, loadingLogin } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
  });

  const submit = async (data) => {
    const success = await userLogin(data);
    if (success) reset();
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
          onSubmit={handleSubmit(submit)}
          style={{ padding: "1.25rem", marginBottom: "1.25rem", }}
        >
          {/* Campo de e-mail */}
          <FormControl
            isInvalid={errors.email}
            w="100%"
            mb="1.925rem"
            textAlign="center"
            alignItems="center"
          >
            <FormLabel
              fontSize="clamp(1rem, 2vw, 1.5rem)"
              fontWeight="bold"
              color="#cb8c26"
              mb="0.3125rem"
              alignSelf="center"
            >
              E-mail
            </FormLabel>
            <Input
              type="email"
              {...register("email")}
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
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          {/* Campo de senha */}
          <FormControl
            isInvalid={errors.password}
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
              {...register("password")}
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
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          {/* Botão de login */}
          <Button
            type="submit"
            isLoading={loadingLogin}
            disabled={loadingLogin}
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
            {loadingLogin ? "Entrando..." : "ENTRAR"}
          </Button>
        </form>

        {/* Botão de registro */}
        <ChakraLink
          as={RouterLink}
          to="/register"
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
          as={RouterLink}
          to="/forgot-password"
          mt="5.625rem"
          fontSize="clamp(1rem, 1.5vw, 1.375rem)"
          color="#CB8C26"
          _hover={{ textDecoration: "underline" }}
        >
          Esqueceu sua senha?
        </ChakraLink>
      </Flex>
    </Flex >
  );
};

export default Login;
