import { Mongo } from "../database/mongo.js"
import { ObjectId } from 'mongodb'


const collectionName = 'ideas'





export default class ideasDataAccess {

    async createIdea(ideaData){
        const result = await Mongo.db
        .collection(collectionName)
        .insertOne({
            ...ideaData,
            createdAt: new Date(),
            likes: 0
        });

        return result.insertedId;
    }


    async getIdeas() {
        const result = await Mongo.db
        .collection(collectionName)
        .aggregate([
          {

            $addFields:{
              user: { $toObjectId:"$user"}
            }
          },
          {
              $lookup: {
                  from: "users", 
                  localField: "user", 
                  foreignField: "_id",
                  as: "userInfo" 
              }
          },
          {
            $unwind: "$userInfo" 
        }
      ])
      .toArray();


        return result
    }

    async getIdeaById(ideaId) {
        const idea = await Mongo.db
          .collection(collectionName)
          .findOne({ _id: new ObjectId(ideaId) });
    
        return idea;
      }


      async getIdeaByUser(userId) {
        const ideas = await Mongo.db
          .collection(collectionName)
          .find({ user: userId })
          .toArray();
    
        return ideas;
      }

      async updateIdea(ideaId, updates) {
        const result = await Mongo.db
          .collection(collectionName)
          .findOneAndUpdate(
            { _id: new ObjectId(ideaId) },
            { $set: updates },
            { returnOriginal: false }
          );
    
        return result.value;
      }

      async deleteIdea(ideaId) {
        const result = await Mongo.db
          .collection(collectionName)
          .findOneAndDelete({ _id: new ObjectId(ideaId) });
    
        return result.value;
      }

    
}