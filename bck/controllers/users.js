import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from '../models/index.cjs';
import crypto from "crypto";
//import { Op } from '@sequelize/core';
const {User,Notification}=db;


const login = async (req, res) => {
  const jwtSecret=process.env.JWT_SECRET;
  try {
    const { username, password } = req.body;

    const currentUser = await User.findOne({
      attributes:['fullname','dateofbirth','location','role','useruuid','email','password'],
      where:{username}
    });
    if (!currentUser)
      return res.status(404).json({
        message: "The username you entered doesn't belong to an account.",
      });

    const isCorrectPass = await bcrypt.compare(password, currentUser.password);

    if (!isCorrectPass)
      return res.status(400).json({ message: "Username or Password was incorrect." });

    const token = jwt.sign({ useruuid: currentUser.useruuid, role:currentUser.role }, jwtSecret, {
      expiresIn: "7d",
    });

    let {fullname,email,dateofbirth,location}=currentUser;
    let result={username,fullname,email,dateofbirth,location};
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

/*const signup = async (req, res) => {
  
  try {
    console.log(req.body)
    const { username, password,dateofbirth,location,email,confirmPassword,firstName,lastName } = req.body;


    // let currentUser = await User.findOne({where:{username}});
    // if (currentUser)
    //   return res.status(400).json({
    //     message: "This username already exists. Please use different one",
    //   });
      
    // currentUser = await User.findOne({where:{email}});
    // if (currentUser)
    //   return res.status(400).json({
    //     message: "This email already exists. Please use different email",
    //   });

    // if (password !== confirmPassword)
    //   return res.status(400).json({
    //        message: "Password and confirm password don't match" 
    //     });

    // const encryptedPassword = await bcrypt.hash(password, saltHash);
    // // const newUser = await User.create({
    //   email,
    //   password: encryptedPassword,
    //   username,
    //   fullname:firstName+' '+lastName,
    //   dateofbirth,
    //   location,
    //   role:'user',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // });

    // const token = jwt.sign({ useruuid: newUser.useruuid, role:newUser.role }, jwtSecret, {
    //   expiresIn: "7d",
    // });
    // //send mail?
    // let {fullname}=newUser;
    // let result={fullname,email,dateofbirth,location,username};
    result="success"
    token="token"
    res.status(200).json({message:"success"});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
*/


const signup = async (req, res) => {
  
    const jwtSecret=process.env.JWT_SECRET;
    const saltHash=parseInt(process.env.SALT);
    
    var { username, password,dateofbirth,location,email,confirmPassword,firstName,lastName } = req.body;

    await User.findOne({ where:{username}})
    .then(async (data) => {
      if (data)
        return res.status(400).json({message: "This username already exists. Please use different one"});
      var findUser = await User.findOne({where:{email}});
      if (findUser)
        return res.status(400).json({
          message: "This email already exists. Please use a different email" });
      if (password !== confirmPassword)
        return res.status(400).json({message: "Password and confirm password don't match" });
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
          role:'user',
          createdAt: new Date(),
          updatedAt: new Date()
        });
      

        const token = jwt.sign({ useruuid: newUser.useruuid, role:newUser.role }, jwtSecret, {
          expiresIn: "7d",
        });
      
      //send mail?
      
      let result={fullname,email,dateofbirth,location,username,fullname};
      res.status(201).json({result,token});
    }
    }).catch(error =>{
      res.status(500).json({ message: `Something went wrong, ${error}` });
    });
    
    
   
};





const update = async (req, res) => {
  
  try {
    const { useruuid } = req.userId;
    //if new pass not null, change pass
    const {firstName,lastName,emailupdt,dateofbirthupdt,locationupdt,oldPass,newPass}=req.body

    const checkPass= await User.findOne({attributes:['password'],where:uuid})    
    
    const isCorrectPass = await bcrypt.compare(oldPass, checkPass);

    if (!isCorrectPass)
      return res.status(400).json({ message: "Password was incorrect." });
    var updatePass
    if (newPass){
      updatePass= await bcrypt.hash(newPass, saltHash);
    }
    const updatedUser = await User.update({
        fullname:firstName+' '+lastName,
        email:emailupdt,
        dateofbirth,
        location:locationupdt,  
        password:updatePass,
        updatedAt:new Date()
      },{
        where:{
          useruuid
      }});
  
    
    let {fullname,email,dateofbirth,location}=updatedUser;
    let result={fullname,email,dateofbirth,location,username};
    res.status(201).json({ result});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
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




export { login, signup, update, resetPass, deleteAdm, changePass };