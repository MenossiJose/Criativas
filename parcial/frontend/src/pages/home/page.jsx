import {
    Flex,
    Text,
} from "@chakra-ui/react"
import { useState, useEffect } from "react";
import ideaServices from "../../services/idea";
import SimpleNavbar from "../../components/navbar/navbar";
import CardIdea from "../../components/card/card";

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
            h="100vh">
            <SimpleNavbar />
            <Text>Home</Text>
            <CardIdea />
        </Flex>
    );
}

export default Home;