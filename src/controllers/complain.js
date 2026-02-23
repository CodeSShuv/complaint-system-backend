import AppError from "../../utils/AppError.js";
import { Complain } from "../models/Complain.js";
import mongoose from "mongoose";
const handleGetComplaints = async (req, res) => {
  let model = req.body;
  model.userId = req.user.user.userId;

  let complain = new Complain(model);
  complain.save();
  res.json({ msg: "Complain Sent" });
};
export default handleGetComplaints;

//for user to get complain count
export const handleGetComplaintCount = async (req, res) => {
  let active, pending, fulfilled;
  if (req.user.user.role === "Admin") {
    [active, pending, fulfilled] = await Promise.all([
      Complain.find({ status: "In Progress" }),
      Complain.find({ status: "Pending" }),
      Complain.find({ status: "Fulfilled" }),
    ]);
  } else {
    [active, pending, fulfilled] = await Promise.all([
      Complain.find({ userId: new mongoose.Types.ObjectId(req.user.user.userId), status: "In Progress" }),
      Complain.find({ userId: new mongoose.Types.ObjectId(req.user.user.userId), status: "Pending" }),
      Complain.find({ userId: new mongoose.Types.ObjectId(req.user.user.userId), status: "Fulfilled" }),
    ]);
  }

  res.json({
    NOfTotal: active.length + pending.length + fulfilled.length,
    NOfActive: active.length,
    NOfPending: pending.length,
    NOfFulfilled: fulfilled.length,
  });
};

export const handleFetchAllComplaints = async (req, res) => {
  let allComplains;
  if (req.user.user.role === "Admin" || req.user.user.role === "Super Admin") {
    console.log(req.user.user.role);
    allComplains = await Complain.find();

  } else {

    allComplains = await Complain.find({ userId: new mongoose.Types.ObjectId(req.user.user.userId) });
  }
  // console.log(req.user.user.userId);

  return res.json({ data: [...allComplains] });
};

export const handleFetchComplaint = async (req, res) => {
  let complaintId = req.params.complaintId;
  let userId = req.user.user.userId;
  console.log(req.user.user);
  let complaint = await Complain.findById(new mongoose.Types.ObjectId(complaintId)).populate("userId", "firstname lastname email")
  // console.log(complaint);
  if (!complaint) {
    throw new AppError("Not Found", 404);
  }
  else if (req.user.user.role === "Admin" || req.user.user.role === "Super Admin") {
    res.json({ data: complaint });

  }
  if (complaint.userId._id.toString() !== userId && req.user.user.role === "Student") {
    throw new AppError("Unauthorized", 401);
  }



};


export const handleDeleteComplaint = async (req, res) => {
  let complaintId = req.params.complaintId;


  let complaint = await Complain.findById(new mongoose.Types.ObjectId(complaintId));
  if (!complaint) {
    throw new AppError("Failed to delete as complaint Not Found", 404);
  }

  await Complain.findByIdAndDelete(new mongoose.Types.ObjectId(complaintId));
  res.json({ msg: "Complaint Deleted" });
}

