import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Text,
    Heading,
    Icon,
    Button,
} from '@chakra-ui/react'
import { FaRegThumbsUp, FaRegTrashCan, FaCommentDots } from "react-icons/fa6";


const CardIdea = (category, date, description, user, isOwner, onDelete) => {


    //Usuario Criou? retorna card com exclusao e edicao : retorna card sem exclusao e edicao

    return (
        <Card align='center'
            size="md"
            w="387px"
            h="199px"
            borderRadius="15px"
            bg="#DCB5FB"
            boxShadow='lg'
            mx="57"
            my="10"
        >
            <CardHeader
                display="flex"
                justifyContent="space-between"
            >
                <Icon pos="absolute"
                    w="21px"
                    h="21px"
                    top="3"
                    left="3"
                    as={FaRegTrashCan}
                />
                <Heading size='md'>Categoria</Heading>
                <Text
                    pos="absolute"
                    top="2"
                    right="4"
                    fontWeight="light"
                    fontSize="13px"
                    color="#504C4C"
                >
                    22/01/2025
                </Text>
            </CardHeader>
            <CardBody>
                <Text>Corpo do card</Text>
            </CardBody>
            <CardFooter
                display="flex"
                justifyContent="space-between"
            >
                <Text
                    pos="absolute"
                    bottom="2"
                    left="4"
                    fontWeight="semibold"
                    fontSize="14px"
                    color="#504C4C"
                >
                    Usuário
                </Text>

                <Button
                    pos="absolute"
                    bottom="2.5"
                    right="3"
                    w="21px"
                    h="21px"
                    bg="transparent"
                    _hover={{ bg: 'rgba(255, 255, 255, 0.2)' }}
                    p="0"
                    minW="0"
                >
                    <Icon
                        w="21px"
                        h="21px"
                        as={FaRegThumbsUp}
                        color="#504C4C"
                    />
                </Button>

                <Button
                    pos="absolute"
                    bottom="2.5"
                    right="12"
                    w="21px"
                    h="21px"
                    bg="transparent"
                    _hover={{ bg: 'rgba(255, 255, 255, 0.2)' }}
                    p="0"
                    minW="0"
                >
                    <Icon
                        w="21px"
                        h="21px"
                        as={FaCommentDots}
                        color="#504C4C"
                    />
                </Button>

            </CardFooter>
        </Card>

    );
}

export default CardIdea;
/*
        <div>
            <h1>Ideias</h1>

            {ideasLoading ? (
                <CircularProgress />
            ) : (
                <>
                    {Array.isArray(ideas) && ideas.length === 0 ? (
                        <Typography variant="body1">Nenhuma ideia encontrada.</Typography>
                    ) : (

                        ideas.map((idea) => (
                            <Paper key={idea._id} style={{ margin: "1rem", padding: "1rem" }}>
                                <Typography variant="h6">Categoria: {idea.category}</Typography>
                                <Typography variant="body1">{idea.text}</Typography>
                                <Typography variant="caption" color="textSecondary">
                                    Criada em: {new Date(idea.createdAt).toLocaleString()}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    Likes: {idea.likes}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    Criada por: {idea.user}
                                </Typography>
                            </Paper>
                        ))
                    )}
                </>
            )}
        </div>
*/