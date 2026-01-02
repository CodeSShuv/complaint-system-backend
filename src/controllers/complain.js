import { Complain } from "../models/Complain.js";
const handleGetComplain = async (req, res, next) => {
  let model = req.body;
  model.userId = req.user.user.userId;

  let complain = new Complain(model);
  complain.save();
  res.json({ msg: "Complain Sent" });
};
export default handleGetComplain;
export const handleGetComplainCount = async (req, res, next) => {
  try {
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
  } catch (e) {
    console.log(e);
  }
};

export const handleFetchAllComplains = async (req, res) => {
  let allComplains = await Complain.find();
  console.log(allComplains);
  return res.json({ data: [...allComplains] });
};
