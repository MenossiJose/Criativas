import React, { useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Text,
    Heading,
    IconButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    VStack,
    Input,
    Flex,
    Box
} from '@chakra-ui/react'
import { FaRegThumbsUp, FaRegTrashCan, FaCommentDots } from "react-icons/fa6";
import ideaServices from "../../services/idea"


const CardIdea = ({ idea, loggedUser, showDelete, onLike, onDelete }) => {

    const { likeIdea, getAllComments, addComment } = ideaServices();
    const [localLikes, setLocalLikes] = useState(idea.likes);
    const [hasLiked, setHasLiked] = useState(idea.people_likes ? idea.people_likes.includes(loggedUser._id) : false);
    const [isOpen, setIsOpen] = useState(false);
    const [comments, setComments] = React.useState([]);
    const [newComment, setNewComment] = useState("");
    const isOwner = loggedUser._id === idea.user;

    const handleDelete = () => {
        onDelete(idea._id);
    };

    const openModal = async () => {
        setIsOpen(true);
        try {
            const fetchedComments = await getAllComments(idea._id);
            setComments(fetchedComments || []);
        } catch (error) {
            console.error("Erro ao buscar comentários:", error);
        }
    };

    const closeModal = () => setIsOpen(false);

    const handleLike = async () => {
        try {
            const newLikes = hasLiked ? localLikes - 1 : localLikes + 1;
            setLocalLikes(newLikes);
            setHasLiked(!hasLiked);

            const updatedIdea = await likeIdea(idea._id, !hasLiked);

            if (onLike) {
                onLike(updatedIdea);
            }
        } catch (error) {
            console.error("Erro ao atualizar o like:", error);
        }
    }

    const handleAddComment = async () => {
        try {
            await addComment(idea._id, loggedUser._id, newComment);
            setNewComment("");
            const updatedComments = await getAllComments(idea._id);
            setComments(updatedComments);
        } catch (error) {
            console.error("Erro ao adicionar comentário:", error);
        }
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    return (
        <Card align='center'
            size="md"
            w="387px"
            h="199px"
            borderRadius="15px"
            bg="#FBF8AB"
            boxShadow='lg'
            mx="57"
            my="10"
            position="relative"
        >
            <CardHeader
                display="flex"
                justifyContent="space-between"
                p={3}
            >
                {isOwner && showDelete && (
                    <Popover>
                        <PopoverTrigger>
                            <IconButton
                                aria-label='Delete'
                                pos="absolute"
                                top="3"
                                bg="transparent"
                                left="3"
                                w="21px"
                                h="21px"
                                as={FaRegTrashCan}
                                color="#504C4C"
                                _hover={{
                                    bg: 'transparent',
                                    cursor: 'pointer',
                                    color: '#666'
                                }}
                            />

                        </PopoverTrigger>
                        <PopoverContent
                            bg="#781A3C"
                            borderColor="black">
                            <PopoverArrow bg="black" />
                            <PopoverCloseButton color="white" />
                            <PopoverHeader
                                fontWeight="bold"
                                fontSize="18px"
                                color="white"
                                borderWidth="0"
                            >
                                Tem certeza que deseja excluir?</PopoverHeader>
                            <PopoverBody
                            >
                                <Button colorScheme='red'
                                    onClick={handleDelete}
                                >
                                    SIM
                                </Button>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>

                )}

                <Heading size='md'
                    fontSize="24px">
                    {idea.category}
                </Heading>
                <Text
                    pos="absolute"
                    top="2"
                    right="4"
                    fontWeight="light"
                    fontSize="13px"
                    color="#504C4C"
                >
                    {formatDate(idea.createdAt)}
                </Text>
            </CardHeader>
            <CardBody
                display="flex"
                alignItems="center"
                textAlign="center"
                ml="1"
                flex="1"
                p={2}
                overflow="hidden"
            >
                <Text>{idea.text}</Text>
            </CardBody>
            <CardFooter
                display="flex"
                w="100%"
                justifyContent="space-between"
            >

                <Flex>
                    <Text
                        pos="absolute"
                        bottom="1"
                        right="12"
                        bg="transparent"
                    >{localLikes}</Text>
                    <IconButton
                        aria-label='Like'
                        pos="absolute"
                        bottom="2.5"
                        bg="transparent"
                        right="3"
                        w="21px"
                        h="21px"
                        as={FaRegThumbsUp}
                        onClick={handleLike}
                        color="#504C4C"
                        _hover={{
                            bg: 'transparent',
                            cursor: 'pointer',
                            color: '#666'
                        }}
                    />

                </Flex>

                <IconButton
                    aria-label='Comment'
                    pos="absolute"
                    bottom="2.5"
                    bg="transparent"
                    right="16"
                    w="21px"
                    h="21px"
                    as={FaCommentDots}
                    onClick={openModal}
                    color="#504C4C"
                    _hover={{
                        bg: 'transparent',
                        cursor: 'pointer',
                        color: '#666'
                    }}
                />

                <Modal isOpen={isOpen} onClose={closeModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Comentários</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack align="stretch" spacing={3}>
                                {comments && comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <Box
                                            key={comment.id}
                                            p={3}
                                            border="1px solid #ccc"
                                            borderRadius="md"
                                        >
                                            <Text fontWeight="bold">{comment.user}</Text>
                                            <Text>{comment.text}</Text>
                                        </Box>
                                    ))
                                ) : (
                                    <Text>Nenhum comentário ainda</Text>
                                )}
                                <Input
                                    placeholder="Adicionar comentário"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <Button onClick={handleAddComment} colorScheme="blue">
                                    Enviar
                                </Button>
                            </VStack>
                        </ModalBody>
                    </ModalContent>
                </Modal>

            </CardFooter>
        </Card >

    );
}

export default CardIdea;
