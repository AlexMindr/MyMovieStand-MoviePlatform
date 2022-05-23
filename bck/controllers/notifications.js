import db from '../models/index.cjs';
//import { Op } from '@sequelize/core';
const {Notification,User}=db;


//de adaugat read field in model, si functie de update on notif click aici
const getNotif = async (req, res) => {
    
    try {
        const uuid=req.userId
        const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});
        const notifications = await Notification.findAll({where:userid});
  
      res.status(200).json(notifications);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

const addNotif = async (req, res) => {
    try {
        const {content}=req.body;
        const uuid=req.userId
        const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});

        const newNotif=await Notification.create(
        {   
            userid,
            content,
            read:false,
            createdAt:new Date(),
            updatedAt:new Date()
        }
      );
      
      res.status(201).json(newNotif);
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  };


const deleteSelected = async (req, res) => {
    try {
    const {deleteIds}=req.body;
    const uuid=req.userId
    const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});
    

    deleteIds=deleteIds.split(',');
    deleteIds.map(async (notificationid)=>{
        await Notification.destroy(
            {where:{
                notificationid,
                userid
            }})})
  
    //const updatedNotifications = await Notification.findAll({where:userid});
   
    //res.status(201).json(updatedNotifications);
    res.status(201).json("Success");
    
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  };

  

  const updateNotif  = async (req, res) => {
    try {
    
    const {updateId}=req.body;
    const uuid=req.userId
    const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});

    await Notification.update(
    {
      read:true,
      updatedAt:new Date()
    },
    {
      where:{
        notificationid:updateId,
        userid
    }})

    //const updatedNotifications = await Notification.findAll({where:userid});
   
    //res.status(201).json(updatedNotifications);
    res.status(201).json("Success");
    
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  };

  export {getNotif, deleteSelected, addNotif, updateNotif};