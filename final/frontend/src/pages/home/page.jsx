import {
    Flex,
    Text,
    Input,
    InputGroup,
    InputRightAddon,
    IconButton,
    VStack,
    HStack,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import SimpleNavbar from "../../components/navbar/navbar";
import CardIdea from "../../components/card/card";
import { FaMagnifyingGlass } from "react-icons/fa6";
import useIdeas from "../../helpers/ideaHelper";

const Home = () => {
    const [LoggedUser, setLoggedUser] = useState(null);


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("auth"));
        setLoggedUser(user);
    }, []);

    const {
        ideas,
        userIdeas,
        filteredIdeas,
        searchTerm,
        isSearchMode,
        setSearchTerm,
        handleDeleteIdea,
        handleLikeUpdate,
        handleSearch,
    } = useIdeas(LoggedUser);




    return (
        <Flex direction="column" bg="#D9D9D9" h="100vh" overflow="hidden">
            <SimpleNavbar />

            {/* Barra de pesquisa */}
            <Flex>
                <InputGroup
                    bg="#ffffff"
                    mt="10"
                    ml="4"
                    borderRadius="10"
                    w="310px"
                >
                    <Input
                        type="text"
                        value={searchTerm}
                        placeholder="Pesquisar categorias, títulos..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <InputRightAddon>
                        <IconButton
                            aria-label="Search Database"
                            w="16px"
                            h="18px"
                            as={FaMagnifyingGlass}
                            onClick={handleSearch}
                            _hover={{
                                bg: "transparent",
                                cursor: "pointer",
                                color: "#666",
                            }}
                        />
                    </InputRightAddon>
                </InputGroup>
            </Flex>

            {isSearchMode ? (<Grid overflow="auto" templateColumns='repeat(3, 1fr)'>
                {filteredIdeas.map((idea) => (
                    <GridItem>
                        <CardIdea
                            key={idea._id}
                            idea={idea}
                            loggedUser={LoggedUser?.user}
                            onLike={handleLikeUpdate}
                        />
                    </GridItem>
                ))}
            </Grid>) : (
                //Seção Ideias
                <Flex direction="column">

                    {/*Ideias Recentes*/}
                    <Flex direction="column"
                        overflowX="auto"
                        overflowY="hidden">

                        <Text fontSize="28px" fontWeight="bold" ml="6" mt="4">
                            Ideais Recentes
                        </Text>

                        <VStack align="flex-start">

                            <HStack spacing={2}>
                                {ideas.map((idea) => (
                                    <CardIdea
                                        key={idea._id}
                                        idea={idea}
                                        loggedUser={LoggedUser?.user} // Adicione a verificação aqui
                                        onLike={handleLikeUpdate}
                                    />
                                ))}
                            </HStack>

                        </VStack>

                    </Flex>

                    {/*Ideias do Usuário*/}
                    <Flex
                        direction="column"
                        mt="20"
                        overflowX="auto"
                        overflowY="hidden"
                    >

                        <Text fontSize="28px" fontWeight="bold" ml="6" mt="4">
                            Suas Ideais
                        </Text>

                        <VStack align="flex-start">

                            <HStack spacing={2} overflowX="auto">
                                {userIdeas.map((idea) => (
                                    <CardIdea
                                        key={idea._id}
                                        idea={idea}
                                        loggedUser={LoggedUser?.user} // Adicione a verificação aqui
                                        onLike={handleLikeUpdate}
                                        onDelete={handleDeleteIdea}
                                        showDelete={true}
                                    />
                                ))}
                            </HStack>

                        </VStack>

                    </Flex>

                </Flex>)};

        </Flex>
    );
};

export default Home;
