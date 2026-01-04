import AppError from "../../utils/AppError.js";
import { Complain } from "../models/Complain.js";
const handleGetComplain = async (req, res) => {
  let model = req.body;
  model.userId = req.user.user.userId;

  let complain = new Complain(model);
  complain.save();
  res.json({ msg: "Complain Sent" });
};
export default handleGetComplain;
export const handleGetComplainCount = async (req, res) => {
  let [active, pending, fulfilled] = await Promise.all([
    Complain.find({ status: "Active" }),
    Complain.find({ status: "Pending" }),
    Complain.find({ status: "Fulfilled" }),
  ]);

  res.json({
    NOfTotal: active.length + pending.length + fulfilled.length,
    NOfActive: active.length,
    NOfPending: pending.length,
    NOfFulfilled: fulfilled.length,
  });
};

export const handleFetchAllComplains = async (req, res) => {
  let allComplains = await Complain.find();

  return res.json({ data: [...allComplains] });
};

export const handleFetchComplain = async (req, res) => {
  let complainId = req.params.complainId;
  let complain = await Complain.findById({ _id: complainId });
  if (!complain) {
    throw new AppError("Not Found", 404);
  }

  res.json({ data: complain });
};
