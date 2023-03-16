import db from "../models/index.cjs";
//import { Op } from '@sequelize/core';
const { Notification, User } = db;

function getPagination(page, size) {
  const limit = size ? +size : 20;
  const offset = page ? page * limit : 0;
  return { limit, offset };
}

function getPagingData(data, page, limit) {
  const { count: totalItems, rows: notifications } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { notifications, totalPages };
}

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
      const { notifications, totalPages } = getPagingData(data, page, limit);

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

const addNotifAdmin = async (req, res) => {
  try {
    const useruuid = req.userId;
    const role = req.userRole;
    const user = await User.findOne({ where: { useruuid, role } });
    if (user) {
      const { content, username } = req.body;

      const { userid } = await User.findOne({
        attributes: ["userid"],
        where: { username },
      });
      const newNotif = await Notification.create({
        userid,
        content,
        read: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.status(201).json({ message: "Success" });
    } else {
      res
        .status(404)
        .json({ message: "Something went wrong/User doesn't exist!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addGlobalNotifAdmin = async (req, res) => {
  try {
    const useruuid = req.userId;
    const role = req.userRole;
    const user = await User.findOne({ where: { useruuid, role } });
    if (user) {
      const { content } = req.body;

      const userids = await User.findAll({ attributes: ["userid"] });
      userids.map(async (user) => {
        await Notification.create({
          userid: user.userid,
          content,
          read: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });

      res.status(201).json({ message: "Success" });
    } else {
      res.status(404).json({ message: "Something went wrong" });
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
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

export {
  getNotif,
  deleteNotif,
  addNotifAdmin,
  addGlobalNotifAdmin,
  updateNotif,
  addNotif,
  getNotifPag,
};
