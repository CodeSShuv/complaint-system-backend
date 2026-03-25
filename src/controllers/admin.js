import { User } from '../models/User.js';
import { Complain } from '../models/Complain.js';
import senderEmail from '../../utils/emailVerification.js';
import { templateGenerator } from "../email-template/updateStatus.js";
import { validationResult } from "express-validator";
import AppError from '../../utils/AppError.js';
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
    throw new AppError("User with this email already exists", 400);
  }
  complaint.status = status;
  await complaint.save();
  complaint = await complaint.populate("userId", "email firstname lastname");
  console.log(complaint);
  senderEmail(complaint.userId.email, "Complaint Status Updated", templateGenerator(complaint.userId.firstname + " " + complaint.userId.lastname, complaint, remarks));
  res.json({ msg: "Complaint status updated", status: status });
}
const createAdmin = async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    throw new AppError(errors.array()[0].msg, 401);
  }
  let { email, password, firstname, lastname } = req.body;
  if (!email || !password || !firstname || !lastname) {
    throw new AppError("Please fill the fields correctly ", 401);
  }
  if (await User.findOne({ email })) {
    throw new AppError("User with this email already exists", 400);
  }
  let user = new User({ email, password, firstname, lastname, role: "Admin", isVerified: true });
  await user.save();
  res.json({ msg: "Admin created successfully" });
}
const deleteUser = async (req, res) => {
  let userId = req.params.userId;
  let user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  let complaints = await Complain.find({ userId: userId });
  await Promise.all(complaints.map(async (complaint) => {
    await Complain.findByIdAndDelete(complaint._id);
  }));
  await User.findByIdAndDelete(userId);

  res.json({ msg: "User deleted successfully" });
}

const getStats = async (req, res) => {
  console.log(req.user.user);
  let totalStudents = await User.countDocuments({ role: "Student" });
  let totalAdmins = await User.countDocuments({ role: "Admin" });
  let totalComplaints = await Complain.countDocuments();
  let activeComplaints = await Complain.countDocuments({ status: "Active" });
  let pendingComplaints = await Complain.countDocuments({ status: "Pending" });
  let fulfilledComplaints = await Complain.countDocuments({ status: "Fulfilled" });
  console.log({
    totalStudents,
    totalAdmins,
    totalComplaints,
    activeComplaints,
    pendingComplaints,
    fulfilledComplaints
  });
  res.json({
    totalStudents,
    totalAdmins,
    totalComplaints,
    activeComplaints,
    pendingComplaints,
    fulfilledComplaints
  });
}
export { getAllUsers, getAllUnverifiedUsers, updateComplaintStatus, createAdmin, deleteUser, getStats };