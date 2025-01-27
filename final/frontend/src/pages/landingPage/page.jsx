import {
    Flex,
    Link as ChakraLink,
    Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import meninaslogo from "../../assets/meninaslogo.png";

const LandingPage = () => {

    return (
        <Flex
            bg="#a54367"
            w="100vw"
            h="100vh"
            justify="center"
            align="center"
            fontFamily="Arial, sans-serif"
            overflow="auto"
            direction="row"
        >
            {/*Coluna a esquerda*/}
            <Flex
                w="70px"
                bg="#d9d9d9"
                h="100%"
                borderColor="black"
                borderRightWidth="1px"
            >
            </Flex>

            {/*Corpo do Conteúdo*/}
            <Flex
                bg="#d9d9d9"
                w="60%"
                h="100%"
                direction="column"
                overflow="auto"
            >
                <img
                    src={meninaslogo}
                    alt="meninaslogo"
                    className="logo"
                    style={{ width: "clamp(338px, 30%, 314px)", margin: "1.0rem auto" }}
                />

                {/*Sobre Div*/}
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                >

                    <Text fontSize="28px"
                        color="#CB8C26"
                        fontWeight='bold'
                        mb="1.0rem"
                    >
                        Sobre
                    </Text>

                    <Text
                        fontSize="18px"
                        fontWeight='light'
                        align="center"
                        w="50%"
                    >
                        O projeto de extensão Meninas Digitais UTFPR-CP foi criado em 2023 com o objetivo de
                        apoiar e estimular a participação de meninas em computação e STEM
                        (sigla em inglês para ciência, tecnologia, engenharia e matemática).
                        O projeto incentiva e auxilia estudantes do ensino fundamental e médio de escolas públicas das cidades de Cornélio Procópio e região,
                        no interior do Paraná. A estratégia do projeto inclui o ensino de temas em computação e STEM voltados
                        à resolução de desafios dos Objetivos de Desenvolvimento Sustentável (ODS) da Organização das Nações Unidas (ONU),
                        por meio de oficinas, palestras, minicursos, rodas de conversa e participação em uma competição global de inovação, chamada Technovation Girls.
                    </Text>

                </Flex>

                {/*Link para a Home*/}
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    mt="3.5rem"
                >
                    <img
                        src={logo}
                        alt="logo"
                        className="logo"
                        style={{ width: "clamp(100px, 30%, 90px)", margin: "1.0rem auto" }}
                    />

                    <ChakraLink
                        as={RouterLink}
                        to="/home"
                        mt="1 rem"
                        fontSize="20px"
                        color="#CB8C26"
                    >
                        Entrar no Banco de Ideias!

                    </ChakraLink>

                </Flex>

            </Flex>

            {/*Coluna a direita*/}
            <Flex
                w="70px"
                bg="#d9d9d9"
                h="100%"
                borderColor="black"
                borderLeftWidth="1px"
            >
            </Flex>

        </Flex>
    );
};

export default LandingPage;