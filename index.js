import express from 'express';
import { request } from 'express';
import {MongoClient, ObjectId} from 'mongodb';
import dotenv from 'dotenv';
import {moviesRouter} from './routes/movies.js';
import { usersRouter } from './routes/users.js';
import cors from 'cors';

dotenv.config();
console.log(process.env)
const app=express();
//const PORT=9000;
const PORT=process.env.PORT;
const movies=[
    {id:"100",
    name:"Finding Nemo",
    poster:"https://lumiere-a.akamaihd.net/v1/images/pp_findingnemo_herobannermobile_19752_7810e507.jpeg?region=0,0,640,480",
    rating:1,
    language:"english",
    summary:"Finding Nemo is a 2003 American computer-animated adventure film produced by Pixar Animation Studios and released by Walt Disney Pictures.",
    trailer:"https://www.youtube.com/embed/2zLkasScy7A?list=TLPQMjAxMTIwMjF0W5QeqdyCyA"},
        {id:"101",
        name:"Alice in Wonderland",
         poster: "https://i.pinimg.com/originals/c5/af/d0/c5afd03996fc8a4c20ea5ab110c93a65.jpg",
         rating:8,
         language:"english",
         summary:"Alice in Wonderland is a 2010 American dark fantasy film directed by Tim Burton from a screenplay written by Linda Woolverton. The film stars Johnny Depp, ..",
        trailer:"https://www.youtube.com/embed/9POCgSRVvf0"},
        {id:"102",
        name:"Frozen",
        poster:"https://i.ytimg.com/vi/MdIDq6o4i-Y/movieposter_en.jpg",
        rating:9,
        language:"english",
        summary:"Frozen is a 2013 American computer-animated musical fantasy film produced by Walt Disney Animation Studios and released by Walt Disney Pictures.",
    trailer:"www.youtube.com/embed/Zi4LMpSDccc"},
      
        {id:"103",
        name:"The lion king",
        poster:"https://lumiere-a.akamaihd.net/v1/images/image_359725f2.jpeg?region=0,0,640,480",
        rating:8,
        language:"english",
        summary:" The Lion King ... Disney's film journeys to the African savanna where a future king is born. Simba idolizes his father, King Mufasa, and takes to ..",
        trailer:"https://www.youtube.com/embed/7TavVZMewpY"},
      {id:"104",
      name:"Dumbo",
        poster:"https://img1.hotstarext.com/image/upload/f_auto,t_vl/sources/r1/cms/prod/4575/674575-v",
        rating:9,
        language:"english",
        summary:"Dumbo is a 2019 American fantasy period adventure film directed by Tim Burton, with a screenplay by Ehren Kruger. The film is a live-action adaptation and ...",
    trailer:"https://www.youtube.com/embed/7NiYVoqBt-8"},
        {id:"105",
        name:"master",
      poster:"https://m.media-amazon.com/images/M/MV5BNmU1OTYzYzAtMDcyOS00MDI0LTg2ZmQtYTEyMDdmMmQ0MjY5XkEyXkFqcGdeQXVyOTk3NTc2MzE@._V1_FMjpg_UX1000_.jpg",
      rating:9,
      language:"tamil",
      summary:"Troubled alcoholic teacher JD is sent to teach at a juvenile reform school. But when he realises a dangerous criminal is using his students to cover up his crimes, JD sets out to stop him. Strong violence, drug misuse.",
    trailer:"https://www.youtube.com/embed/UTiXQcrLlv4"},
      {id:"106",
      name:"aranmanai-3",
      poster:"https://m.media-amazon.com/images/M/MV5BYWIyNTA3MjgtM2QxMS00MDBkLTg2MDMtNmMzNTlmYzU1ZjI1XkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
      rating:9,
      language:"tamil",
      summary:"At a remote and mysterious palace, a man falls in love with a woman who's guarded by angry spirits.",
      trailer:"https://www.youtube.com/embed/MRiK4WHaJb8"},
      {id:"107",
      name:"udanpirappe",
      poster:"https://i.ytimg.com/vi/rmgjG_pqMuQ/maxresdefault.jpg",
      rating:8,
      language:"tamil",
      summary:"A woman tries to establish peace in her family when her husband and her brother have an intense difference of opinion over the efficacy of the justice system.",
      trailer:"https://www.youtube.com/embed/Luhzp1435sI"},
      
      {id:"108",
      name:"lift",
      poster:"https://tamil.samayam.com/photo/msid-86448369,imgsize-127780/pic.jpg",
      rating:7,
      language:"tamil",
      summary:"A routine working day turns unusual for Guru and Harini when they get trapped in their haunted office. A patterned game unlocks a mystery, and a lift is their only way out.",
     trailer:"https://www.youtube.com/embed/Kj50JODc5Cc"},
      {id:"109",
      name:"Jai Bhim",
      poster:"https://gumlet.assettype.com/swarajya%2F2021-11%2F9dfb808a-4d4d-4e86-adaa-aa7abf1fdd0e%2FMV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5__V1_FMjpg_UX1000_.jpg?q=75&auto=format%2Ccompress&w=1200",
      rating:8,
      language:"tamil",
      summary:" As for Jai Bhim, it is perhaps one of the boldest films to come out of Tamil cinema. Most of you might confuse its boldness with the film's ...",
    trailer:"https://www.youtube.com/embed/UY34eAUxuRk"}
     
    ];
app.use(express.json());//middleware
app.use(cors());
//const MONGO_URL="mongodb://localhost";
const MONGO_URL=process.env.MONGO_URL;

async function createConnection(){
    const client=new MongoClient(MONGO_URL);
    await client.connect();//promise
    console.log("Mongodb connected")
    return client;
}
export const client=await createConnection();
    //filter by language
    //filter by rating
 //filter by rating n language
app.get('/',(request,response)=>{
    response.send("hello ,world***");
});

app.use('/movies', moviesRouter)
app.use('/usersdata',usersRouter)

app.listen(PORT,()=>console.log(`App is started ${PORT}`))


