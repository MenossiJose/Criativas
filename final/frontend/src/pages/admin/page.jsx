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
    Spinner,
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
            <CardHeader>{idea.category}</CardHeader>
            <CardBody>{idea.text}</CardBody>
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
    );
}

const AdminPage = () => {
    const { getUsersIdeas, deleteIdea } = ideaServices();
    const { getUser, deleteUser } = adminServices();

    const authData = JSON.parse(localStorage.getItem('auth'));

    const [userIdeas, setUserIdeas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [userSearched, setUserSearched] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        resetSearch();
    }, []);

    const resetSearch = () => {
        setUserSearched(null);
        setHasSearched(false);
        setSearchTerm("");
        setUserIdeas([]);
        setError(null);
    };

    const handleIdeas = async (userId) => {
        try {
            const userIdeasData = await getUsersIdeas(userId);
            setUserIdeas(userIdeasData);
        } catch (error) {
            console.error("Erro ao carregar as ideias do usuário:", error);
            setError("Erro ao carregar as ideias do usuário");
        }
    };

    const handleDeleteIdea = async (ideaId) => {
        try {
            const success = await deleteIdea(ideaId);
            if (success) {
                setUserIdeas(userIdeas.filter((idea) => idea._id !== ideaId));
            }
        } catch (error) {
            console.error("Erro ao deletar a ideia:", error);
            setError("Erro ao deletar a ideia");
        }
    };

    const handleUserDelete = async () => {
        setLoading(true);
        try {
            const success = await deleteUser(userSearched._id);
            if (success) {
                resetSearch();
                setLoading(false);
            }
        } catch (error) {
            console.error("Erro ao deletar o usuário:", error);
            setError("Erro ao deletar o usuário");
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        setLoading(true);
        e.preventDefault();
        setError(null);
        if (searchTerm.trim() === '') {
            setError('Por favor, insira um ID.');
            setLoading(false);
            return;
        }
        try {
            const lowerCaseTerm = searchTerm.toLowerCase();
            const userSearched = await getUser(lowerCaseTerm);
            if (userSearched.body?.length > 0) {
                setUserSearched(userSearched.body[0]);
                handleIdeas(userSearched.body[0]._id);
            } else {
                resetSearch();
            }
            setHasSearched(true);
        } catch (error) {
            console.error("Erro ao carregar o usuário:", error);
            setError("Erro ao carregar o usuário");
            resetSearch();
        } finally {
            setLoading(false);
        }
    };

    if (!authData.user.isAdmin) {
        return <Flex>NAO E ADM</Flex>;
    }

    return (
        <Flex direction="column" overflow="auto" bg="#D9D9D9" h="100vh">
            <SimpleNavbar />
            <Flex w="100%" direction="row" justifyContent="space-between">
                <Box mt="7" ml="10" w={400} h={800} bg="white" borderWidth="1px" margin="1">
                    <VStack>
                        {userIdeas.length > 0 && userIdeas.map((idea) => (
                            <CardAdmin key={idea.id} idea={idea} onDelete={handleDeleteIdea} />
                        ))}
                    </VStack>
                </Box>
                <Flex mt="7" ml="20" w={252} h={496} borderWidth="1px" margin="1" direction="column" alignContent="center" justifyContent="space-between">
                    <Box padding="2">
                        <Text fontSize="20px">Usuários</Text>
                        <InputGroup bg="#ffffff">
                            <Input
                                placeholder="Pesquise pelo ID"
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <InputRightAddon>
                                <IconButton
                                    aria-label="Search Database"
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
                        {loading && <Spinner />}
                        {error && <Text color="red.500">{error}</Text>}
                        {hasSearched && (
                            <Text fontSize="15px" my="5">
                                {userSearched ? "Usuário Encontrado" : "Usuário Não Encontrado"}
                            </Text>
                        )}
                    </Box>
                    <Box padding="2" h={340} bg="white" direction="column">
                        <Text>{userSearched?.fullname}</Text>
                        <Text>{userSearched?.email}</Text>
                        {hasSearched && userSearched && (
                            <Flex my="5" mt="auto" >
                                <Button isLoading={loading} onClick={handleUserDelete} >{loading ? "DELETANDO..." : "DELETAR"}</Button>
                            </Flex>
                        )}
                    </Box>
                </Flex>
                <Box></Box>
            </Flex>
        </Flex>
    );
};

export default AdminPage;