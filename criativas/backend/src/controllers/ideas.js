import IdeasDataAccess from "../dataAccess/Ideas.js"
import { ok, serverError } from "../helpers/httpResponses.js"

export default class IdeasControllers {
    constructor() {
        this.dataAccess = new IdeasDataAccess()
    }

    async createIdea(ideaData){
        try {
            const ideaId = await this.dataAccess.createIdea(ideaData);
            return ok({ id: ideaId, message: 'Idea created successfully' });
          } catch (error) {
            return serverError(error);
          }
    }



    async getIdeas() {
        try {
            const Ideas = await this.dataAccess.getIdeas()
            
            return ok(Ideas)
        } catch (error) {
            return serverError(error)
        }
        
    }

    async getIdeaById(ideaId) {
        try {
          const idea = await this.dataAccess.getIdeaById(ideaId);
          return ok(idea);
        } catch (error) {
          return serverError(error);
        }
      }

      async getIdeaByUser(userId) {
        try {
          const idea = await this.dataAccess.getIdeaByUser(userId);
          return ok(idea);
        } catch (error) {
          return serverError(error);
        }
      }


      async deleteIdea(ideaId) {
        try {
          const result = await this.dataAccess.deleteIdea(ideaId);
          return ok(result);
        } catch (error) {
          return serverError(error);
        }
      }

    async updateIdea(ideaId, updates) {
        try {
          const updatedIdea = await this.dataAccess.updateIdea(ideaId, updates);
          return ok(updatedIdea);
        } catch (error) {
          return serverError(error);
        }
      }
}