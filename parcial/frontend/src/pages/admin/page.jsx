import { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Text,
    Button,
    Flex,
    VStack,
    Box,
    Input,
    InputGroup,
    InputRightAddon,
    IconButton,
} from '@chakra-ui/react';
import { FaMagnifyingGlass, FaRegTrashCan } from "react-icons/fa6";
import SimpleNavbar from '../../components/navbar/navbar';
import ideaServices from "../../services/Idea";
import adminServices from '../../services/admin';

function CardAdmin({ idea, onDelete }) {

    const handleDelete = () => {
        onDelete(idea._id);
    };

    return (
        <Card>
            <CardHeader>
                {idea.category}
            </CardHeader>
            <CardBody>
                {idea.text}
            </CardBody>
            <CardFooter>
                {idea.user}
                {idea.createdAt}
                <IconButton
                    aria-label='Delete'
                    bg="transparent"
                    w="21px"
                    h="21px"
                    as={FaRegTrashCan}
                    onClick={handleDelete}
                    color="#504C4C"
                    _hover={{
                        bg: 'transparent',
                        cursor: 'pointer',
                        color: '#666'
                    }}
                />
            </CardFooter>
        </Card>
    )
}

const AdminPage = () => {

    const { getUsersIdeas, deleteIdea } = ideaServices();
    const { getUser, deleteUser } = adminServices();

    const authData = JSON.parse(localStorage.getItem('auth'))

    const [userIdeas, setUserIdeas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [userSearched, setUserSearched] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        setUserSearched(null);
        setHasSearched(false);
        setSearchTerm(""); // Limpar o termo de pesquisa ao carregar a página
    }, []);

    const handleIdeas = (userId) => {
        getUsersIdeas(userId)
            .then((userIdeasData) => {
                setUserIdeas(userIdeasData);
            })
            .catch((error) => {
                console.error("Erro ao carregar as ideias do usuário:", error);
            });
    }


    const handleDeleteIdea = async (ideaId) => {
        const success = await deleteIdea(ideaId);
        if (success) {
            setUserIdeas(userIdeas.filter((idea) => idea._id !== ideaId));
        }
    };

    const handleUserDelete = async () => {
        const success = await deleteUser(userSearched._id);
        if (success) {
            setUserSearched(null);
            setUserIdeas([]); // Limpar as cards se o usuário for deletado
        }
    };

    const handleSearch = () => {
        const lowerCaseTerm = searchTerm.toLowerCase();
        getUser(lowerCaseTerm)
            .then((userSearched) => {
                if (userSearched.body && userSearched.body.length > 0) {
                    setUserSearched(userSearched.body[0]);
                    handleIdeas(userSearched.body[0]._id);

                } else {
                    setUserSearched(null);
                    setUserIdeas([]); // Limpar as cards se o usuário não for encontrado
                }
                setHasSearched(true);
                setSearchTerm(""); // Limpar o termo de pesquisa após a pesquisa

            })
            .catch((error) => {
                console.error("Erro ao carregar o usuário:", error);
                setUserSearched(null);
                setUserIdeas([]); // Limpar as cards se houver um erro
                setHasSearched(true);
                setSearchTerm(""); // Limpar o termo de pesquisa após a pesquisa
            });
    };

    if (authData.user.isAdmin) {
        return (
            <Flex
                direction="column"
                overflow="auto"
                bg="#D9D9D9"
                h="100vh">
                <SimpleNavbar />

                <Flex
                    w="100%"
                    direction="row"
                    justifyContent="space-between"
                >
                    <Box
                        mt="7"
                        ml="10"
                        w={400}
                        h={800}
                        bg="white"
                        borderWidth="1px"
                        margin="1"
                    >
                        <VStack>
                            {userIdeas.length > 0 && userIdeas.map((idea) => (
                                <CardAdmin key={idea.id} idea={idea} onDelete={handleDeleteIdea} />
                            ))}
                        </VStack>

                    </Box>

                    <Flex
                        mt="7"
                        ml="20"
                        w={252}
                        h={496}
                        borderWidth="1px"
                        margin="1"
                        direction="column"
                        alignContent="center"
                        justifyContent="space-between"
                    >
                        <Box
                            padding="2"
                        >
                            <Text fontSize="20px">Usuários</Text>
                            <InputGroup
                                bg="#ffffff"
                            >
                                <Input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <InputRightAddon>
                                    <IconButton
                                        aria-label="Search Database"
                                        // w="16px"
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
                            {hasSearched && (
                                <Text fontSize="15px" my="5">
                                    {userSearched ? "Usuário Encontrado" : "Usuário Não Encontrado"}
                                </Text>
                            )}
                        </Box>
                        <Box
                            padding="2"
                            h={340}
                            bg="white"

                        >
                            <Text>{userSearched ? userSearched.fullname : null}</Text>
                            <Text>{userSearched ? userSearched.email : null}</Text>
                            {hasSearched && (
                                <Box my="5" >
                                    {userSearched ? <Button
                                        onClick={handleUserDelete}
                                    >
                                        DELETAR
                                    </Button> : null}
                                </Box>
                            )}
                        </Box>
                    </Flex>

                    <Box>

                    </Box>

                </Flex>
            </Flex>
        )
    }
    else {
        return (
            <Flex>NAO E ADM</Flex>
        )
    }

}

export default AdminPage;