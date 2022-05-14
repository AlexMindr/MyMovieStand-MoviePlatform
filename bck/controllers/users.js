import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from '../models/index.cjs';
import crypto from "crypto";
import { Op } from '@sequelize/core';
const {User,Notification,Watchlist}=db;

async function watchListStatus(wlName,id){
  let wl = await Watchlist.count({
    attributes:['status'],
    where:{
      userid:id,
      status:wlName?{[Op.eq]:wlName}:{[Op.not]:null}
      //status:{[Op.eq]:wlName}
    }
  })
  return wl;
  
}

const getProfile = async(req,res) => {
  
  try{
  const {username} =req.params
  const profileUser = await User.findOne({
    attributes:['fullname','dateofbirth','location','role','email','username','userid','createdAt','gender','bio'],
    where:{username}
  });

  if(profileUser){
    const watching=await watchListStatus('Watching',profileUser.userid);
    const completed=await watchListStatus('Completed',profileUser.userid)
    const dropped=await watchListStatus('Dropped',profileUser.userid)
    const plantowatch=await watchListStatus('Plan to watch',profileUser.userid)
    const onhold=await watchListStatus('On-hold',profileUser.userid)
    const totalStatus=await watchListStatus('',profileUser.userid)
    const joined=profileUser.createdAt
    res.status(200).json({ profileUser,watching,completed,dropped,plantowatch,onhold,totalStatus,joined});
  }
  else {res.status(400).json({ message:"Profile does not exist" });}

  
  } catch (error) {
  res.status(400).json({ error:error.message });
 }
}


const getSimpleProfile = async(req,res) => {
  
  try{
  const useruuid =req.userId
  const profileUser = await User.findOne({
    attributes:['fullname','dateofbirth','location','gender','bio'],
    where:{useruuid}
  });

  if(profileUser){
    res.status(200).json({ profileUser});
  }
  else {res.status(400).json({ message:"Profile does not exist" });}

  
  } catch (error) {
  res.status(500).json({ error:error.message });
 }
}

const verifyToken= async(req,res)=>{
  const jwtSecret=process.env.JWT_SECRET;
   try {
      const token = req.headers.authorization.split(" ")[1];

      
      if (token) {
         const decodedData = jwt.verify(token, jwtSecret)
         res.status(200).json({ token });
      }
      else res.status(404).json({ message:'Not logged in' });  

      

   } catch (error) {
    res.status(400).json({ error });
   }
}

const login = async (req, res) => {
  const jwtSecret=process.env.JWT_SECRET;
  try {
    const { username, password } = req.body;

    const currentUser = await User.findOne({
      attributes:['fullname','dateofbirth','location','role','useruuid','email','password','gender'],
      where:{username}
    });
    if (!currentUser)
      return res.status(400).json({
        message: "The username you entered doesn't belong to an account.",
      });

    const isCorrectPass = await bcrypt.compare(password, currentUser.password);

    if (!isCorrectPass)
      return res.status(400).json({ message: "Username or Password was incorrect." });

    const token = jwt.sign({ useruuid: currentUser.useruuid, role:currentUser.role }, jwtSecret, {
      expiresIn: "7d",
    });

    let fullname,email,dateofbirth,location,role,result,gender
    ({fullname,email,dateofbirth,location,role}=currentUser); 
    if(role==='admin')
       result={username,fullname,email,dateofbirth,location,gender,role};
    else
       result={username,fullname,email,dateofbirth,gender,location};
    
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};



const signup = async (req, res) => {
  
    const jwtSecret=process.env.JWT_SECRET;
    const saltHash=parseInt(process.env.SALT);
    
    var { username, password,dateofbirth,location,email,confirmPassword,firstName,lastName,gender } = req.body;

    User.findOne({ where:{username}})
    .then(async (data) => {
      if (data)
        return res.status(400).json({message: "This username already exists. Please use different one"});
      var findUser = await User.findOne({where:{email}});
      if (findUser)
        return res.status(400).json({
          message: "This email already exists. Please use a different email" });
      let re = new RegExp("^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9_.-:;]{4,}$")
      if(!re.test(password))
        return res.status(400).json({message: "Invalid password" });
      if (password !== confirmPassword)
        return res.status(400).json({message: "Passwords don't match" });
      else {
        const fullname=firstName+' '+lastName
        const encryptedPassword = await bcrypt.hash(password, saltHash);
        const newUser = await User.create({
          email,
          password:encryptedPassword,
          username,
          fullname,
          dateofbirth,
          location,
          bio,
          gender,
          role:'user',
          createdAt: new Date(),
          updatedAt: new Date()
        });
      

        const token = jwt.sign({ useruuid: newUser.useruuid, role:newUser.role }, jwtSecret, {
          expiresIn: "7d",
        });
      
      //send mail?
      let result={fullname,email,dateofbirth,location,username,gender};
      res.status(201).json({result,token});
    }
    }).catch(error =>{
      res.status(500).json({ message: `Something went wrong, ${error}` });
    });
    
    
   
};





const update = async (req, res) => {
  const saltHash=parseInt(process.env.SALT);
  try {
    const  useruuid  = req.userId;
    //if new pass not null, change pass
    const {firstName,lastName,dateofbirth,location,bio,gender,oldPass,newPass}=req.body

    
    const checkPass= await User.findOne({attributes:['password','userid','email','username'],where:{useruuid}})    
    
    const isCorrectPass = await bcrypt.compare(oldPass, checkPass.password);
    
    if (!isCorrectPass)
      return res.status(400).json({ message: "Password was incorrect." });
    var updatePass=null
    
    if (newPass){
      updatePass= await bcrypt.hash(newPass, saltHash);
      
    }
    
    var fullName='g'+'g'
    if(firstName && lastName)
      fullName=firstName+' '+lastName
    else if(firstName) fullName=firstName+'g'
        else if(lastName) fullName='g'+lastName

    const updatedUser = await User.update({
        fullname:fullName,
        dateofbirth:dateofbirth,
        location:location,
        bio:JSON.stringify(bio),
        gender:gender,  
        password:updatePass?updatePass:checkPass.password,
        updatedAt:new Date()
      },{
        where:{
          userid:checkPass.userid
      }});

      
    let result={fullname:fullName,email:checkPass.email,
      dateofbirth:dateofbirth?dateofbirth:null,location:location?location:null,username:checkPass.username};
    
    res.status(201).json({result});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error.message)
  }
};


const deleteAdm = async (req, res) => {
  
  try {
    const {id}=req.params;
    const deleteUser = await User.destroy({
        where:{
          userid:id
      }});
  
    
  res.status(201).json({ message:"Success"});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};



const resetPass = async (req, res) => {
  
  try {
    const {email}=req.body
    const newCode = crypto.randomBytes(10).toString('hex');
    
    const selectUser= await User.findOne({where:email})

    if (!selectUser)
      return res.status(400).json({ message: "Email was incorrect." });

     //send mail with newCode

    const changecode= await bcrypt.hash(newCode, saltHash);
    
    await User.update({
        changecode,
        updatedAt:new Date()
      },{
        where:{
          useruuid
      }});
  
   
    res.status(201).json({message:"A code has been sent to your email address!"});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};


const changePass = async (req, res) => {
  
  try {
    const {email,newPass,changeCode}=req.body
    
    const selectUser= await User.findOne({attributes:['password','userid','changecode'],where:email})
    
    if (!selectUser)
      return res.status(400).json({ message: "Email was incorrect." });

    const isCorrectCode = await bcrypt.compare(changeCode, selectUser.changecode);

    if (!isCorrectCode)
        return res.status(400).json({ message: "Code was incorrect." });
    
    const isOldPass = await bcrypt.compare(newPass, selectUser.password);

    if (!isOldPass)
            return res.status(400).json({ message: "Cannot change into the same password" });
        
    const updatePass= await bcrypt.hash(newPass, saltHash);
    
    await User.update({
        password:updatePass,
        updatedAt:new Date()
      },{
        where:{
          userid:selectUser.userid
      }});
  
    //send email?

    res.status(201).json({message:"The password has been changed!"});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};




export { login, signup, update, resetPass, deleteAdm, changePass,verifyToken,getProfile,getSimpleProfile };