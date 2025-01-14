import {
    Text,
    Flex,
    Button,
    Link as ChakraLink,
    IconButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from "@chakra-ui/react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { ArrowBackIcon } from '@chakra-ui/icons';
import authServices from "../../services/auth"

const Profile = () => {
    const { logout } = authServices();
    const navigate = useNavigate()
    const authData = JSON.parse(localStorage.getItem('auth'))

    const handleLogout = () => {
        logout()
        return navigate('/')
    }

    return (
        <Flex
            bg="#a54367"
            w="100vw"
            h="100vh"
            justify="center"
            align="center"
            fontFamily="Arial, sans-serif"
        >
            <ChakraLink
                as={RouterLink}
                to="/home"
                pos="absolute"
                top="10"
                left="10"
            >
                <IconButton
                    isRound={true}
                    variant='solid'
                    colorScheme='orange'
                    aria-label='Back'
                    fontSize='20px'

                    icon={<ArrowBackIcon />}
                />
            </ChakraLink>

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

                <Flex
                    fontSize="26px"
                    direction="column"
                    mt="auto"

                >

                    <Text
                        mb="0.325rem"
                        fontWeight="bold"
                        color="#CB8C26"
                    >Nome</Text>
                    <Text>{authData?.user?.fullname}</Text>

                </Flex>

                <Flex
                    fontSize="26px"
                    direction="column"
                    mt="3.65rem"

                >

                    <Text
                        mb="0.325rem"
                        fontWeight="bold"
                        color="#CB8C26"
                    >E-mail</Text>
                    <Text>{authData?.user?.email}</Text>

                </Flex>

                {/* Botão de logout */}

                <Popover>
                    <PopoverTrigger>
                        <Button
                            bg="#ED2727"
                            color="white"
                            fontSize="clamp(1rem, 1.5vw, 1.375rem)"
                            p="0.625rem"
                            h="2.400rem"
                            w="clamp(100px, 30%, 120px)"
                            borderRadius="0.825rem"
                            mt="auto"
                            _hover={{ bg: "#FF5C5C" }}
                        >
                            SAIR
                        </Button>
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
                            Tem certeza que deseja sair?</PopoverHeader>
                        <PopoverBody>
                            <Button colorScheme='red'
                                onClick={handleLogout}
                            >
                                SIM</Button>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>

            </Flex>
        </Flex>
    )
}

export default Profile