'use client';

import React from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    Text,
    Menu,
    useDisclosure,
    useColorModeValue,
    Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import logonav from '../../assets/logonav.png';

// Define os links com rótulos e URLs
const Links = [
    { label: 'Cadastrar Ideia', path: '/ideas' },
    { label: 'Perfil', path: '/profile' },
    { label: 'Banco de Ideias', path: '/home' },
];

function NavLink({ children, path }) {

    return (
        <Box
            as={Link} // Usa o Link do React Router
            to={path} // Define a rota para o link
            px={2}
            py={1}
            rounded="md"
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
        >
            {children}
        </Box>
    );
}

export default function SimpleNavbar() {

    const authData = JSON.parse(localStorage.getItem('auth'))

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems="center" justifyContent="space-between">
                    {/* Botão de menu hamburguer para dispositivos menores */}
                    <IconButton
                        size="md"
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label="Toggle Menu"
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    {/* Links e logo */}
                    <HStack spacing={8} alignItems="center">
                        <Box>
                            <img
                                src={logonav}
                                alt="logonav"
                                className="logonav"
                                style={{ width: 'clamp(225px, 30%, 80px)' }}
                            />
                        </Box>
                        <HStack as="nav" spacing={8} display={{ base: 'none', md: 'flex' }}>
                            {Links.map(({ label, path }) => (
                                <NavLink key={label} path={path}>
                                    {label}
                                </NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    {/* Avatar */}
                    <Flex alignItems="center">
                        <Text>
                            {authData ? authData.user.fullname : "Erro ao carregar nome"}
                        </Text>

                        <Avatar
                            ml={4}
                            size="sm"
                            src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                        />
                    </Flex>
                </Flex>

                {/* Menu colapsável para dispositivos menores */}
                {isOpen && (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as="nav" spacing={4}>
                            {Links.map(({ label, path }) => (
                                <NavLink key={label} path={path}>
                                    {label}
                                </NavLink>
                            ))}
                        </Stack>
                    </Box>
                )}
            </Box>
        </>
    );
}
