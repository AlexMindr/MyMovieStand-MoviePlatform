import db from "../models/index.cjs";
import dotenv from "dotenv";
import { getPagination, getPagingData } from "../utils/getPagination.js";

dotenv.config();
const { Notification, User } = db;

const getNotifPag = async (req, res) => {
  const { page } = req.params;
  const { limit, offset } = getPagination(page - 1);
  const userid = req.userId;

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
      res.status(500).json({ message: "Something went wrong" });
    });
};

const getNotif = async (req, res) => {
  try {
    const userid = req.userId;
    const notifications = await Notification.findAll({
      where: { userid },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const addNotif = async (req, res) => {
  try {
    const userid = req.userId;
    const { content } = req.body;

    const newNotif = await Notification.create({
      userid,
      content,
      read: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json({ newNotif });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteNotif = async (req, res) => {
  try {
    const { notificationid } = req.params;
    const userid = req.userId;

    await Notification.destroy({
      where: {
        notificationid,
        userid,
      },
    });
    //const updatedNotifications = await Notification.findAll({where:userid});
    //res.status(201).json(updatedNotifications);
    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateNotif = async (req, res) => {
  try {
    const { notificationid } = req.body;
    const userid = req.userId;

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
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { getNotif, deleteNotif, updateNotif, addNotif, getNotifPag };
