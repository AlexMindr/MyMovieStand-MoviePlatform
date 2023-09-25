import db from "../models/index.cjs";
//import { Op } from '@sequelize/core';
import dotenv from "dotenv";
import { getPagination, getPagingData } from "../utils/getPagination.js";

dotenv.config();
const { Notification, User } = db;

const getNotifPag = async (req, res) => {
  const { page } = req.params;
  const { limit, offset } = getPagination(page - 1);
  const uuid = req.userId;
  const { userid } = await User.findOne({
    attributes: ["userid"],
    where: { useruuid: uuid },
  });
  await Notification.findAndCountAll({
    limit,
    offset,
    where: { userid },
    order: [["createdAt", "DESC"]],
  })
    .then((data) => {
      const { rows: notifications, totalPages } = getPagingData(
        data,
        page,
        limit
      );

      res.status(200).json({ notifications, totalPages });
    })

    .catch((error) => {
      res.status(404).json({ message: error.message });
      //console.log(error)
    });
};

const getNotif = async (req, res) => {
  try {
    const uuid = req.userId;
    const { userid } = await User.findOne({
      attributes: ["userid"],
      where: { useruuid: uuid },
    });
    const notifications = await Notification.findAll({
      where: { userid },
      order: [["createdAt", "DESC"]],
    });
    //console.log(notifications)
    res.status(200).json(notifications);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addNotif = async (req, res) => {
  try {
    const useruuid = req.userId;
    //const role=req.userRole
    const { userid } = await User.findOne({ where: { useruuid } });
    if (userid) {
      const { content } = req.body;

      const newNotif = await Notification.create({
        userid,
        content,
        read: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.status(201).json(newNotif);
    } else {
      res.status(404).json({ message: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteNotif = async (req, res) => {
  try {
    const { notificationid } = req.params;
    const uuid = req.userId;
    const { userid } = await User.findOne({
      attributes: ["userid"],
      where: { useruuid: uuid },
    });

    await Notification.destroy({
      where: {
        notificationid,
        userid,
      },
    });

    //const updatedNotifications = await Notification.findAll({where:userid});

    //res.status(201).json(updatedNotifications);
    res.status(201).json("Success");
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const updateNotif = async (req, res) => {
  try {
    const { notificationid } = req.body;
    //console.log(notificationid)
    const uuid = req.userId;
    const { userid } = await User.findOne({
      attributes: ["userid"],
      where: { useruuid: uuid },
    });

    await Notification.update(
      {
        read: true,
        updatedAt: new Date(),
      },
      {
        where: {
          notificationid,
          userid,
        },
      }
    );

    //const updatedNotifications = await Notification.findAll({where:userid});

    //res.status(201).json(updatedNotifications);
    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

export { getNotif, deleteNotif, updateNotif, addNotif, getNotifPag };
