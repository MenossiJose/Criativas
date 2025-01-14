import {
    Flex,
    Text,
    Input,
    InputGroup,
    InputRightAddon,
    Stack,
    IconButton,
} from "@chakra-ui/react"
import { useState, useEffect } from "react";
import ideaServices from "../../services/idea";
import SimpleNavbar from "../../components/navbar/navbar";
import CardIdea from "../../components/card/card";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Home = () => {

    const { ideasLoading, getAllIdeas } = ideaServices();
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {

        getAllIdeas()
            .then((ideasData) => {
                setIdeas(ideasData);


            })
            .catch((error) => {
                console.error("Erro ao carregar ideias:", error);
            });
    }, []);


    return (
        <Flex
            direction="column"
            bg="#D9D9D9"
            h="100vh"
            overflow="auto">

            <SimpleNavbar />

            <Flex>
                <InputGroup
                    bg="#ffffff"
                    mt="10"
                    ml="4"
                    borderRadius="10"
                    w="310px"
                >
                    <Input placeholder='Pesquisar categorias, títulos...' />
                    <InputRightAddon>
                        <IconButton
                            aria-label='Search Database'
                            w="16px"
                            h="18px"
                            as={FaMagnifyingGlass}
                            _hover={{
                                bg: 'transparent',
                                cursor: 'pointer',
                                color: '#666'
                            }}
                        />
                    </InputRightAddon>
                </InputGroup>
            </Flex>


            <Flex
                direction="column">
                <Text
                    fontSize="28px"
                    fontWeight="bold"
                    ml="6"
                    mt="4"
                >
                    Ideais Recentes</Text>
                <CardIdea />
            </Flex>

            <Flex
                direction="column"
                mt="20">
                <Text
                    fontSize="28px"
                    fontWeight="bold"
                    ml="6"
                    mt="4"
                >
                    Suas Ideais</Text>
                <CardIdea />
            </Flex>

        </Flex>
    );
}

export default Home;