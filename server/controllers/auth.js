import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../models/index.cjs";
import dotenv from "dotenv";
dotenv.config();

const { User } = db;
const jwtSecret = process.env.JWT_SECRET;
const saltHash = parseInt(process.env.SALT);

const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      const decodedData = jwt.verify(token, jwtSecret);
      return res.status(200).json({ token });
    } else return res.status(404).json({ message: "Not logged in" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const currentUser = await User.findOne({
      attributes: [
        "fullname",
        "firstName",
        "lastName",
        "dateofbirth",
        "location",
        "role",
        "useruuid",
        "email",
        "password",
        "gender",
      ],
      where: { username },
    });
    if (!currentUser)
      return res.status(400).json({
        message: "The username you entered doesn't belong to an account.",
      });

    const isCorrectPass = await bcrypt.compare(password, currentUser.password);

    if (!isCorrectPass)
      return res
        .status(400)
        .json({ message: "Username or Password was incorrect." });

    const token = jwt.sign(
      { useruuid: currentUser.useruuid, role: currentUser.role },
      jwtSecret,
      {
        expiresIn: "7d",
      }
    );

    const { fullname, email, dateofbirth, location, role, gender } =
      currentUser;
    const user = {
      username,
      fullname,
      email,
      dateofbirth,
      location,
      gender,
      role: role === "admin" ? role : undefined,
    };

    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const signup = async (req, res) => {
  const {
    username,
    password,
    dateofbirth,
    location,
    email,
    confirmPassword,
    firstName,
    lastName,
    gender,
  } = req.body;

  User.findOne({ where: { username } })
    .then(async (data) => {
      if (data)
        return res.status(400).json({
          message: "This username already exists. Please use different one",
        });
      var findUser = await User.findOne({ where: { email } });
      if (findUser)
        return res.status(400).json({
          message: "This email already exists. Please use a different email",
        });
      let re = new RegExp("^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9_.-:;]{4,}$");
      if (!re.test(password))
        return res.status(400).json({ message: "Invalid password" });
      if (password !== confirmPassword)
        return res.status(400).json({ message: "Passwords don't match" });
      else {
        const fullname = firstName + " " + lastName;
        const encryptedPassword = await bcrypt.hash(password, saltHash);
        const newUser = await User.create({
          email,
          password: encryptedPassword,
          username,
          firstName,
          lastName,
          dateofbirth,
          location,
          gender,
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        const token = jwt.sign(
          { useruuid: newUser.useruuid, role: newUser.role },
          jwtSecret,
          {
            expiresIn: "7d",
          }
        );
        const user = {
          username,
          fullname,
          email,
          dateofbirth,
          location,
          gender,
          role: role === "admin" ? role : undefined,
        };

        return res.status(201).json({ user, token });
      }
    })
    .catch((error) => {
      return res.status(500).json({ message: `Something went wrong` });
    });
};

export { login, signup, verifyToken };
