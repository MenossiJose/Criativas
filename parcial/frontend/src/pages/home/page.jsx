import {
    Flex,
    Text,
} from "@chakra-ui/react"
import SimpleNavbar from "../../components/navbar/navbar";

const Home = () => {

    return (
        <Flex
            direction="column"
            bg="#D9D9D9"
            h="100vh">
            <SimpleNavbar />
            <Text>Home</Text>
        </Flex>
    );
}

export default Home;