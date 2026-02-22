import { User } from '../models/User.js';
import { Complain } from '../models/Complain.js';
import senderEmail from '../../utils/emailVerification.js';
import { templateGenerator } from "../email-template/updateStatus.js";
const getAllUsers = async (req, res) => {

  let users = await User.find({}).select("-password");
  console.log(users);
  res.json({ data: users });
};
const getAllUnverifiedUsers = async (req, res) => {

  let users = await User.find({ isVerified: false });
  res.json({ data: users });
}

const updateComplaintStatus = async (req, res) => {
  let complaintId = req.params.complaintId;
  let { status, remarks } = req.body;
  let complaint = await Complain.findById(complaintId);
  if (!complaint) {
    return res.status(404).json({ msg: "Complaint not found" });
  }
  complaint.status = status;
  await complaint.save();
  complaint = await complaint.populate("userId", "email firstname lastname");
  console.log(complaint);
  senderEmail(complaint.userId.email, "Complaint Status Updated", templateGenerator(complaint.userId.firstname + " " + complaint.userId.lastname, complaint, remarks));
  res.json({ msg: "Complaint status updated", status: status });
}
const createAdmin = async (req, res) => {
  let { email, password, firstname, lastname } = req.body;
  if (!email || !password || !firstname || !lastname) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  if (await User.findOne({ email })) {
    return res.status(400).json({ msg: "User with this email already exists" });
  }
  let user = new User({ email, password, firstname, lastname, role: "Admin", isVerified: true });
  await user.save();
  res.json({ msg: "Admin created successfully" });
}
const deleteUser = async (req, res) => {
  let userId = req.params.userId;
  let user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  await User.findByIdAndDelete(userId);
  res.json({ msg: "User deleted successfully" });
}
export { getAllUsers, getAllUnverifiedUsers, updateComplaintStatus, createAdmin, deleteUser };