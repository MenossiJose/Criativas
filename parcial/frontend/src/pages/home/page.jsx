import { useState, useEffect } from "react";
import ideaServices from "../../services/Idea";
import { CircularProgress, Typography, Paper } from "@mui/material";

export default function Home() {
    const { ideasLoading, getAllIdeas, likeIdea } = ideaServices();
    const [ideas, setIdeas] = useState([]);

    const user = JSON.parse(localStorage.getItem("auth"))?.user._id

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
                                <button onClick={() => likeIdea(idea._id, user)}>
                                    {!!idea.people_likes.includes(user) ? "Descurtir" : "Curtir"}
                                </button>
                                <Typography variant="caption" color="textSecondary">
                                    Criada por: {idea.user}
                                </Typography>
                                <Typography variant="h6"> Comentários: {idea.comments_count}</Typography>
                                <Typography variant="body2"> {idea.comments} </Typography>
                            </Paper>
                        ))
                    )}
                </>
            )}
        </div>
    );
}
