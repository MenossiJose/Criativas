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
import ideaServices from "../../services/idea";
import SimpleNavbar from "../../components/navbar/navbar";
import CardIdea from "../../components/card/card";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Home = () => {
    const { getAllIdeas, getUsersIdeas, deleteIdea } = ideaServices();

    const [ideas, setIdeas] = useState([]);
    const [userIdeas, setUserIdeas] = useState([]);
    const [LoggedUser, setLoggedUser] = useState(null);
    const [filteredIdeas, setFilteredIdeas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchMode, setIsSearchMode] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("auth"));
        setLoggedUser(user);
    }, []);

    useEffect(() => {
        if (!LoggedUser || !LoggedUser.user) {
            console.error("Usuário não está logado ou os dados estão ausentes.");
            return;
        }

        console.log("Usuário logado:", LoggedUser.user);

        getAllIdeas()
            .then((ideasData) => {
                setIdeas(ideasData);
            })
            .catch((error) => {
                console.error("Erro ao carregar todas as ideias:", error);
            });

        getUsersIdeas(LoggedUser.user._id)
            .then((userIdeasData) => {
                setUserIdeas(userIdeasData);
            })
            .catch((error) => {
                console.error("Erro ao carregar as ideias do usuário:", error);
            });
    }, [LoggedUser]);

    const handleDeleteIdea = async (ideaId) => {
        const success = await deleteIdea(ideaId);
        if (success) {
            setIdeas(ideas.filter((idea) => idea._id !== ideaId));
            setUserIdeas(userIdeas.filter((idea) => idea._id !== ideaId));
        }
    };

    // Função para lidar com a pesquisa
    const handleSearch = () => {
        if (searchTerm.trim() === "") {
            setIsSearchMode(false); // Se o termo for vazio, volte para o modo normal
            return;
        }

        const lowerCaseTerm = searchTerm.toLowerCase();
        const filtered = ideas.filter(
            (idea) =>
                idea.category.toLowerCase().includes(lowerCaseTerm) ||
                idea.text.toLowerCase().includes(lowerCaseTerm)
        );
        setFilteredIdeas(filtered);
        setIsSearchMode(true); // Ativa o modo de busca
    };

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
                            category={idea.category}
                            date={idea.createdAt}
                            description={idea.text}
                            user={idea.user}
                            userId={LoggedUser._id}
                            ideaUserId={idea.userId}
                            ideaId={idea._id}
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
                                        category={idea.category}
                                        date={idea.createdAt}
                                        description={idea.text}
                                        user={idea.user}
                                        userId={LoggedUser._id}
                                        ideaUserId={idea.userId}
                                        ideaId={idea._id}
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
                                        category={idea.category}
                                        date={idea.createdAt}
                                        description={idea.text}
                                        user={idea.user}
                                        userId={LoggedUser._id}
                                        ideaUserId={idea.userId}
                                        ideaId={idea._id}
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
