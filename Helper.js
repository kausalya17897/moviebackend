import { client } from './index.js';




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
        .updateOne({ id: id }, { $set: data });
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
        .deleteOne({ id: id });
}
export async function getMovieById(id) {
    return await client
        .db("moviedata")
        .collection("moviedata")
        .findOne({ id: id });
}
