import { useState, useEffect } from "react";
import ideaServices from "../services/idea";

const useIdeas = (loggedUser) => {
    const { getAllIdeas, getUsersIdeas, deleteIdea, likeIdea } = ideaServices();

    const [ideas, setIdeas] = useState([]);
    const [userIdeas, setUserIdeas] = useState([]);
    const [filteredIdeas, setFilteredIdeas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchMode, setIsSearchMode] = useState(false);

    useEffect(() => {
        if (!loggedUser || !loggedUser.user) {
            console.error("Usuário não está logado ou os dados estão ausentes.");
            return;
        }

        getAllIdeas()
            .then((ideasData) => {
                setIdeas(ideasData);
            })
            .catch((error) => {
                console.error("Erro ao carregar todas as ideias:", error);
            });

        getUsersIdeas(loggedUser.user._id)
            .then((userIdeasData) => {
                setUserIdeas(userIdeasData);
            })
            .catch((error) => {
                console.error("Erro ao carregar as ideias do usuário:", error);
            });
    }, [loggedUser]);

    const handleDeleteIdea = async (ideaId) => {
        const success = await deleteIdea(ideaId);
        if (success) {
            setIdeas(ideas.filter((idea) => idea._id !== ideaId));
            setUserIdeas(userIdeas.filter((idea) => idea._id !== ideaId));
        }
    };

    const handleLikeUpdate = (updatedIdea) => {
        if (!updatedIdea || !updatedIdea._id) {
            console.error("Erro: updatedIdea está indefinido ou não possui _id.");
            return;
        }

        // Update main ideas array
        setIdeas((prevIdeas) =>
            prevIdeas.map(idea =>
                idea._id === updatedIdea._id ? updatedIdea : idea
            )
        );

        // Update user ideas array
        setUserIdeas(prevUserIdeas =>
            prevUserIdeas.map(idea =>
                idea._id === updatedIdea._id ? updatedIdea : idea
            )
        );
    };

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

    return {
        ideas,
        userIdeas,
        filteredIdeas,
        searchTerm,
        isSearchMode,
        setSearchTerm,
        handleDeleteIdea,
        handleLikeUpdate,
        handleSearch,
    };
};

export default useIdeas;