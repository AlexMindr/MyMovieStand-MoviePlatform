import db from "../models/index.cjs";

const { User } = db;

export async function getUserIdFromUsername(username) {
  const { userid } = await User.findOne({
    attributes: ["userid"],
    where: { username },
  });
  return userid;
}
