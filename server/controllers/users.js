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

async function watchListStatus(wlName, id) {
  let wl = await Watchlist.count({
    attributes: ["status"],
    where: {
      userid: id,
      status: wlName ? { [Op.eq]: wlName } : { [Op.not]: null },
      //status:{[Op.eq]:wlName}
    },
  });
  return wl;
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
      const watching = await watchListStatus("Watching", profileUser.userid);
      const completed = await watchListStatus("Completed", profileUser.userid);
      const dropped = await watchListStatus("Dropped", profileUser.userid);
      const plantowatch = await watchListStatus(
        "Plan to watch",
        profileUser.userid
      );
      const onhold = await watchListStatus("On-hold", profileUser.userid);
      const totalStatus = await watchListStatus("", profileUser.userid);
      const joined = profileUser.createdAt;
      res.status(200).json({
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
      res.status(404).json({ message: "Profile does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
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
      res.status(200).json({ profileUser });
    } else {
      res.status(400).json({ message: "Profile does not exist" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
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

    const checkPass = await User.findOne({
      where: { useruuid },
    });

    const isCorrectPass = await bcrypt.compare(oldPass, checkPass.password);

    if (!isCorrectPass)
      return res.status(400).json({ message: "Password was incorrect." });
    var updatePass = null;

    if (newPass) {
      updatePass = await bcrypt.hash(newPass, saltHash);
    }

    await User.update(
      {
        firstName: firstName ? firstName : checkPass.firstName,
        lastName: lastName ? lastName : checkPass.lastName,
        dateofbirth: dateofbirth ? dateofbirth : checkPass.dateofbirth,
        location: location ? location : checkPass.location,
        bio: bio ? bio : checkPass.bio,
        gender: gender ? gender : checkPass.bio,
        password: updatePass ? updatePass : checkPass.password,
        updatedAt: new Date(),
      },
      {
        where: {
          userid: checkPass.userid,
        },
      }
    );

    const user = {
      fullname: checkPass.fullname,
      email: checkPass.email,
      dateofbirth: dateofbirth ? dateofbirth : null,
      location: location ? location : null,
      username: checkPass.username,
    };

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

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
        res.status(500).json({ message: "Something went wrong" });
        console.log(err.message);
      } else {
        setTimeout(myFunc, 15 * 60000, selectUser.userid);
        console.log(newCode);
        res.status(201).json({ message: "Success" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error.message);
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

    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { update, resetPass, changePass, getProfile, getSimpleProfile };
