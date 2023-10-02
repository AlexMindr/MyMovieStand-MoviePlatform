import bcrypt from "bcryptjs";
import db from "../models/index.cjs";
import crypto from "crypto";
import { Op } from "@sequelize/core";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const { User, Watchlist } = db;
const saltHash = parseInt(process.env.SALT);
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

async function watchListStatus(wlStatus, id) {
  let wlItemsCount = await Watchlist.count({
    attributes: ["status"],
    where: {
      userid: id,
      status: wlStatus ? { [Op.eq]: wlStatus } : { [Op.not]: null },
    },
  });
  return wlItemsCount;
}

const getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const profileUser = await User.findOne({
      attributes: [
        "fullname",
        "firstName",
        "lastName",
        "dateofbirth",
        "location",
        "role",
        "email",
        "username",
        "userid",
        "createdAt",
        "gender",
        "bio",
      ],
      where: { username },
    });

    if (profileUser) {
      const { userid, createdAt: joined } = profileUser;
      const watching = await watchListStatus("Watching", userid);
      const completed = await watchListStatus("Completed", userid);
      const dropped = await watchListStatus("Dropped", userid);
      const plantowatch = await watchListStatus("Plan to watch", userid);
      const onhold = await watchListStatus("On-hold", userid);
      const totalStatus = await watchListStatus("", userid);
      return res.status(200).json({
        profileUser,
        watching,
        completed,
        dropped,
        plantowatch,
        onhold,
        totalStatus,
        joined,
      });
    } else {
      return res.status(404).json({ message: "Profile does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getSimpleProfile = async (req, res) => {
  try {
    const useruuid = req.userId;
    const profileUser = await User.findOne({
      attributes: [
        "fullname",
        "firstName",
        "lastName",
        "dateofbirth",
        "location",
        "gender",
        "bio",
      ],
      where: { useruuid },
    });

    if (profileUser) {
      return res.status(200).json({ profileUser });
    } else {
      return res.status(404).json({ message: "Profile does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const update = async (req, res) => {
  try {
    const useruuid = req.userId;
    const {
      firstName,
      lastName,
      dateofbirth,
      location,
      bio,
      gender,
      oldPass,
      newPass,
    } = req.body;

    const checkUser = await User.findOne({
      where: { useruuid },
    });

    const isCorrectPass = await bcrypt.compare(oldPass, checkUser.password);
    if (!isCorrectPass)
      return res.status(401).json({ message: "Password was incorrect." });

    const updatePass = newPass ? await bcrypt.hash(newPass, saltHash) : null;
    await User.update(
      {
        firstName: firstName ? firstName : checkUser.firstName,
        lastName: lastName ? lastName : checkUser.lastName,
        dateofbirth: dateofbirth ? dateofbirth : checkUser.dateofbirth,
        location: location ? location : checkUser.location,
        bio: bio ? bio : checkUser.bio,
        gender: gender ? gender : checkUser.bio,
        password: updatePass ? updatePass : checkUser.password,
        updatedAt: new Date(),
      },
      {
        where: {
          userid: checkUser.userid,
        },
      }
    );

    const user = {
      fullname: checkUser.fullname,
      email: checkUser.email,
      dateofbirth: dateofbirth ? dateofbirth : null,
      location: location ? location : null,
      username: checkUser.username,
    };

    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

//TODO
async function myFunc(userid) {
  await User.update(
    {
      changecode: null,
      updatedAt: new Date(),
    },
    {
      where: {
        userid,
      },
    }
  );
}
const resetPass = async (req, res) => {
  try {
    const { email } = req.body;
    const newCode = crypto.randomBytes(5).toString("hex");

    const selectUser = await User.findOne({ where: { email } });

    if (!selectUser) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    const transporter = nodemailer.createTransport({
      pool: true,
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    let mailOptions = {
      from: "mymoviestand@no-contact.com",
      to: selectUser.email,
      subject: `Reset your password`,
      html: ` <h1>Reset your password</h1>
              <br/>
              <p>The code to reset your password is : ${newCode}</p>
        `,
      // attachments: [
      //   {
      //     filename: `${name}.pdf`,
      //     path: path.join(__dirname, `../../src/assets/books/${name}.pdf`),
      //     contentType: 'application/pdf',
      //   },
      // ],
    };

    const changecode = await bcrypt.hash(newCode, saltHash);

    await User.update(
      {
        changecode,
        updatedAt: new Date(),
      },
      {
        where: {
          userid: selectUser.userid,
        },
      }
    );

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        return res.status(500).json({ message: "Something went wrong" });
        console.log(err.message);
      } else {
        setTimeout(myFunc, 15 * 60000, selectUser.userid);
        console.log(newCode);
        return res.status(201).json({ message: "Success" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const changePass = async (req, res) => {
  try {
    const { email, newPass, changeCode } = req.body;

    const selectUser = await User.findOne({
      attributes: ["password", "userid", "changecode"],
      where: { email },
    });

    if (!selectUser)
      return res.status(400).json({ message: "Email was incorrect." });

    if (selectUser.changeCode === null)
      return res.status(400).json({ message: "Reset code has expired!" });
    const isCorrectCode = await bcrypt.compare(
      changeCode,
      selectUser.changecode
    );

    if (!isCorrectCode)
      return res.status(400).json({ message: "Reset code was incorrect." });

    const isOldPass = await bcrypt.compare(newPass, selectUser.password);

    if (!isOldPass)
      return res
        .status(400)
        .json({ message: "Cannot change into the same password" });

    const updatePass = await bcrypt.hash(newPass, saltHash);

    await User.update(
      {
        password: updatePass,
        updatedAt: new Date(),
      },
      {
        where: {
          userid: selectUser.userid,
        },
      }
    );

    return res.status(201).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export { update, resetPass, changePass, getProfile, getSimpleProfile };
