import { client } from './index.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt'



export async function getMovie(filter) {
    return await client
        .db("moviedata")
        .collection("moviedata")
        .find(filter)
        .toArray();
}

export async function updateMovieById(id, data) {
    return await client
        .db("moviedata")
        .collection("moviedata")
        .updateOne({_id:ObjectId(id)}, { $set: data });
}
export async function createMovie(data) {
    return await client
        .db("moviedata")
        .collection("moviedata")
        .insertMany(data);
}
export async function deleteMovieById(id) {
    return await client
        .db("moviedata")
        .collection("moviedata")
        .deleteOne({_id:ObjectId(id) });
    
}
export async function getMovieById(id) {
    return await client
        .db("moviedata")
        .collection("moviedata")
        .findOne({_id: ObjectId(id) });
}
export async function createUser(data) {
    return await client
      .db("moviedata")
      .collection("usersdata")
      .insertOne(data);
  }
  export async function getUserByName(username) {
    return await client
      .db("moviedata")
      .collection("usersdata")
      .findOne({username:username})
  }
  async function genPassword(password){
    const NO_OF_ROUNDS=10;
    const salt=await bcrypt.genSalt(NO_OF_ROUNDS);
    console.log("salt",salt);
    const hashpassword= await bcrypt.hash(password,salt);
    console.log(hashpassword);
    return hashpassword;
  }
  export {genPassword};