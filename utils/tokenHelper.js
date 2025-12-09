import pkg from "jsonwebtoken";
const { sign, decode } = pkg;
export let generateToken = (user) => {
  let token = sign({ user }, process.env.JWT_SECRETE, { expiresIn: "3h" });
  return token;
};

export let decodeToken = (token) => {
  return decode(token, process.env.JWT_SECRETE);
};
