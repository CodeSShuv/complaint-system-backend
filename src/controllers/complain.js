import AppError from "../../utils/AppError.js";
import { Complain } from "../models/Complain.js";
import mongoose from "mongoose";
import { Department } from "../models/Department.js";

const handleGetComplaints = async (req, res) => {
  let model = req.body;
  model.userId = req.user.user.userId;
  let dept = await Department.findOne({ name: model.deptId });
  if (!dept) {
    throw new AppError("Department Doesnot Exist!");
  }
  model.deptId = dept._id;
  let complain = new Complain(model);
  complain.save();
  res.json({ msg: "Complain Sent" });
};
export default handleGetComplaints;

//for user to get complain count
export const handleGetComplaintCount = async (req, res) => {
  try {
    let active = [], pending = [], fulfilled = [];

    if (req.user.user.role === "Admin") {
      const deptId = new mongoose.Types.ObjectId(req.user.user.deptId);
      [active, pending, fulfilled] = await Promise.all([
        Complain.find({ status: "In Progress", deptId }),
        Complain.find({ status: "Pending", deptId }),
        Complain.find({ status: "Resolved", deptId }),
      ]);

    } else if (req.user.user.role === "Super Admin") {
      [active, pending, fulfilled] = await Promise.all([
        Complain.find({  status: "In Progress" }),
        Complain.find({  status: "Pending" }),
        Complain.find({  status: "Resolved" })
      ]);

    } else {
      const userId = new mongoose.Types.ObjectId(req.user.user.userId);
      [active, pending, fulfilled] = await Promise.all([
        Complain.find({ userId, status: "In Progress" }),
        Complain.find({ userId, status: "Pending" }),
        Complain.find({ userId, status: "Resolved" })
      ]);
    }

    res.json({
      NOfTotal: active.length + pending.length + fulfilled.length,
      NOfActive: active.length,
      NOfPending: pending.length,
      NOfFulfilled: fulfilled.length,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
export const handleFetchAllComplaints = async (req, res) => {
  let allComplains;
  if (req.user.user.role === "Super Admin") {
    // console.log(req.user.user.role);
    allComplains = await Complain.find();

  }else if(req.user.user.role ==="Admin"){
    allComplains = await Complain.find({deptId:req.user.user.deptId});
    console.log(req.user.user)

  } else {

    allComplains = await Complain.find({ userId: new mongoose.Types.ObjectId(req.user.user.userId) });
  }
  // console.log(req.user.user.userId);

  return res.json({ data: [...allComplains] });
};

export const handleFetchComplaint = async (req, res) => {
  let complaintId = req.params.complaintId;
  let userId = req.user.user.userId;
  // console.log(req.user.user);
  let complaint = await Complain.findById(new mongoose.Types.ObjectId(complaintId)).populate("userId", "firstname lastname email").populate("deptId", "name")

  // console.log(complaint);
  if (!complaint) {
    throw new AppError("Not Found", 404);
  }
  else if (userId === complaint.userId._id.toString()) {
console.log(complaint.deptId)
    res.json({
      data: complaint
    })
  }
  else if (req.user.user.role === "Admin" || req.user.user.role === "Super Admin") {
    console.log(req.user.user.deptId === complaint.deptId._id)
    if (req.user.user.deptId === complaint.deptId._id.toString()) {
      console.log(complaint)
      res.json({
        data: complaint
      })
    }else if(req.user.user.role==="Super Admin"){
      res.json({
        data: complaint
      })
    }

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

