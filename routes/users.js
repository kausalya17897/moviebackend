import express from 'express';
import { createUser, getUserByName } from '../Helper.js';
import {genPassword} from "../Helper.js";
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken';
import dotenv from "dotenv";
const router=express.Router();
dotenv.config();
router
.route("/signup").post(async(request,response)=>{
  try{
  const {username,password}=request.body;
  const userFromDB=await getUserByName(username);
 console.log("user",userFromDB);

 if(userFromDB){
  response.send({message:"username already exists"})
return;
}

if(password.length<8){
  response.send({message:"password must be longer"});
return;
}



if(
  !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)
  ){
  response.send({message:"password doesnot match"})
  return;
}
   
const hashpassword=await genPassword(password);
 const result=await createUser({username,password:hashpassword});
  response.send.json(result);
}catch(err){
  return response.json(err)
}
});

router.route("/login").post(async(request,response)=>{
 const {username,password}=request.body;

const userFromDB=await getUserByName(username);

if(!userFromDB){
  response.status(400).send({message:"Invalid credentials"});
  return;
}
const storedPassword=userFromDB.password;
console.log("pas",storedPassword);
//to compare stored password and typed password is same
const isPasswordMatch=await bcrypt.compare(password,storedPassword)
  
console.log(isPasswordMatch);
console.log(userFromDB);
if(isPasswordMatch){
 const token=jwt.sign({id:userFromDB._id},process.env.SECRET_KEY)
 console.log("tokk",token)
 response.send({message:"successful login",token:token});
}else{
  response.status(400).send({message:"Invalid credentials"});
}

});

export const usersRouter=router;