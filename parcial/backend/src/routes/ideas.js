import express from 'express'
import IdeasControllers from '../controllers/ideas.js'

const ideasRouter = express.Router()
const ideasController = new IdeasControllers()

//Rota para adicionar uma nova ideia
ideasRouter.post('/', async (req, res) => {
    const response = await ideasController.createIdea({
        category: req.body.category,
        text: req.body.text,
        user: req.body.user,
    });
    res.status(response.statusCode).send(response.body);
});

//Rota para exibir todas as ideias
ideasRouter.get('/', async (req, res) => {

    const response = await ideasController.getIdeas();

    res.status(response.statusCode).send(response.body);
});

//Rota para exibir ideia por usuario
ideasRouter.get('/userIdeas/:user', async (req, res) => {
    const response = await ideasController.getIdeaByUser(req.params.user);
    res.status(response.statusCode).send(response.body);
});

ideasRouter.get('/:id', async (req, res) => {
    const response = await ideasController.getIdeaById(req.params.id);
    res.status(response.statusCode).send(response.body);
});

//Rota para editar ideia
ideasRouter.put('/:id', async (req, res) => {
    const response = await ideasController.updateIdea(req.params.id, req.body);
    res.status(response.statusCode).send(response.body);
});

//Rota para deletar ideia
ideasRouter.delete('/:id', async (req, res) => {
    const response = await ideasController.deleteIdea(req.params.id);
    res.status(response.statusCode).send(response.body);
});

//Rota para curtir ideia
ideasRouter.put('/:id/like', async (req, res) => {
    const response = await ideasController.likeIdea(req.body.id, req.body.user);
    res.status(response.statusCode).send(response.body);
})
//adicionar um comentário
ideasRouter.put('/:id/comment', async (req, res) => {
    const response = await ideasController.addComment(req.body.id, req.body.user, req.body.message);
    res.status(response.statusCode).send(response.body);
})

//Rota para pegar todos os comentários
ideasRouter.get('/:id/comment', async (req, res) => {
    const response = await ideasController.getComments(req.params.id);
    res.status(response.statusCode).send(response.body);
})

//Rota para deletar um comentário
ideasRouter.delete('/:id/comment', async (req, res) => {
    const response = await ideasController.deleteComment(req.params.id, req.body.comment);
    res.status(response.statusCode).send(response.body);
})

//Rota para editar um comentário
ideasRouter.put('/:id/comment/edit', async (req, res) => {
    const response = await ideasController.editComment(req.body.id, req.body.comment, req.body.text);
    res.status(response.statusCode).send(response.body);
})

export default ideasRouter 