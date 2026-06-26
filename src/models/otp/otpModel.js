import otpSchema from "./otpSchema.js";

export const createOTP = (obj)=> {
    return otpSchema(obj).save()
};

export const getOTPByEmail = (email) => {
   return otpSchema.findOne({email: email});
}

export const deleteOTP = (email) => {
    return otpSchema.findOneAndDelete(email);
}