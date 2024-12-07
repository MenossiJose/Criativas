import { useState, useEffect } from "react";
import ideaServices from "../../services/idea";
import { CircularProgress, Typography, Paper } from "@mui/material";

export default function Home() {
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
    );
}
