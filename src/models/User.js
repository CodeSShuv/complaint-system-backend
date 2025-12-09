import {Schema, model} from "mongoose";

let userSchema  =  new Schema({
  firstname : String,
  lastname : String,
  email : {
    type:String,
    unique:true,
    required:true
  },

  password: {
    type:String,
    required:true
  },

  
});

export const User = model("User", userSchema);

