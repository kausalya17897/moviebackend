import express from "express";
import { getMovie,getMovieById,deleteMovieById,updateMovieById,createMovie } from "../Helper.js";


const router=express.Router();

router
.route('/')
.get(async(request,response)=>{
    console.log(request.query);
   
const filter=request.query;
console.log(filter);
if(filter.rating){
    filter.rating=+filter.rating
}
const filterMovies=await getMovie(filter);
response.send(filterMovies);
})
.post(async(request,response)=>{
    const data=request.body;
    const postdata=await createMovie(data);
    response.send(postdata);
});

router
.route('/:id')
.get(async (request,response)=>{
    console.log(request.params);
    const {id}=request.params;
    console.log("***",id);
    //db.movies.find({id:"102"})
    const movie=await getMovieById(id); 
   //manualdatafinding const movie=movies.find((a)=>a.id===id);
    console.log(movie);
    
   movie
    ?response.send(movie)
    :response.status(404).send({message:"no matching movie"});
})
.delete(async (request,response)=>{
    console.log(request.params);
    const {id}=request.params;
    console.log("***",id);
    
    const movie=await deleteMovieById(id); 
   movie.deletedCount>0
    ?response.send(movie)
    :response.status(404).send({message:"no matching movie"});
})
.put(async (request,response)=>{
    console.log(request.params);
    const {id}=request.params;
    const data=request.body;
    console.log("***",id);
    
    const result=await updateMovieById(id, data); 
    const movie=await getMovieById(id);
    response.send(movie)
    //:response.status(404).send({message:"no matching movie"});
})

export const moviesRouter=router;

