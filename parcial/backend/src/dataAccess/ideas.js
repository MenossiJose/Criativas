import { Mongo } from "../database/mongo.js"
import { ObjectId } from 'mongodb'

const collectionName = 'ideas'

export default class ideasDataAccess {

  async createIdea(ideaData) {
    const result = await Mongo.db
      .collection(collectionName)
      .insertOne({
        ...ideaData,
        createdAt: new Date(),
        likes: 0,
        people_likes: [],
        comments: [],
        comments_count: 0,
      });

    return result.insertedId;
  }

  async getIdeas() {
    const result = await Mongo.db
      .collection(collectionName)
      .aggregate([
        {

          $addFields: {
            user: { $toObjectId: "$user" }
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

  async likeIdea(ideaId, userId) {
    const idea = await Mongo.db
      .collection(collectionName)
      .findOne({
        _id: new ObjectId(ideaId),
        people_likes: { $in: [userId] }
      });

    if (!!idea) {
      const result = await Mongo.db
        .collection(collectionName)
        .findOneAndUpdate(
          { _id: new ObjectId(ideaId) },
          {
            $inc: { likes: -1 },
            $pull: { people_likes: { $in: [userId] } }
          },
        );
      return result.value;
    } else {
      const result = await Mongo.db
        .collection(collectionName)
        .findOneAndUpdate(
          { _id: new ObjectId(ideaId) },
          {
            $inc: { likes: 1 },
            $addToSet: { people_likes: userId }
          },
        );

      return result.value;
    }
  }

  async deleteIdea(ideaId) {
    const result = await Mongo.db
      .collection(collectionName)
      .findOneAndDelete({ _id: new ObjectId(ideaId) });

    return result.value;
  }

  async addComment(ideaId, userId, text) {
    const comment = {
      id: new ObjectId().toString(),
      userId,
      text,
      createdAt: new Date(),
    };

    const result = await Mongo.db
      .collection(collectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(ideaId) },
        {
          $inc: { comments_count: 1 },
          $push: { comments: comment }
        }
      );

    return result.value;
  }

  async getComments(ideaId) {
    const idea = await Mongo.db
      .collection(collectionName)
      .findOne({ _id: new ObjectId(ideaId) });

    return idea?.comments || [];
  }

  async deleteComment(ideaId, commentId) {
    const result = await Mongo.db
      .collection(collectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(ideaId) },
        {
          $inc: { comments_count: -1 },
          $pull: { comments: { id: commentId.toString() } }
        },
        { returnDocument: 'after' }
      );

    return result.value;
  }

}