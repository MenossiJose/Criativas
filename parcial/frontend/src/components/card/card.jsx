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
    Button
} from '@chakra-ui/react'
import { FaRegThumbsUp, FaRegTrashCan, FaCommentDots } from "react-icons/fa6";


const CardIdea = ({ category, date, description, userId, ideaUserId, ideaId, onDelete, showDelete }) => {

    const isOwner = userId === ideaUserId;

    const handleDelete = () => {
        onDelete(ideaId);
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
                    {category}
                </Heading>
                <Text
                    pos="absolute"
                    top="2"
                    right="4"
                    fontWeight="light"
                    fontSize="13px"
                    color="#504C4C"
                >
                    {formatDate(date)}
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
                <Text>{description}</Text>
            </CardBody>
            <CardFooter
                display="flex"
                w="100%"
                justifyContent="space-between"
            >

                <IconButton
                    aria-label='Like'
                    pos="absolute"
                    bottom="2.5"
                    bg="transparent"
                    right="3"
                    w="21px"
                    h="21px"
                    as={FaRegThumbsUp}
                    color="#504C4C"
                    _hover={{
                        bg: 'transparent',
                        cursor: 'pointer',
                        color: '#666'
                    }}
                />

                <IconButton
                    aria-label='Comment'
                    pos="absolute"
                    bottom="2.5"
                    bg="transparent"
                    right="16"
                    w="21px"
                    h="21px"
                    as={FaCommentDots}
                    color="#504C4C"
                    _hover={{
                        bg: 'transparent',
                        cursor: 'pointer',
                        color: '#666'
                    }}
                />

            </CardFooter>
        </Card >

    );
}

export default CardIdea;
