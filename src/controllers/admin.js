import { User } from '../models/User.js';
const getAllUsers = async (req, res) => {

  let users = await User.find({});
  res.json({ data: users });
};
const getAllUnverifiedUsers = async (req, res) => {

  let users = await User.find({ isVerified: false });
  res.json({ data: users });
}

export { getAllUsers, getAllUnverifiedUsers };