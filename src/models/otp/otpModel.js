import otpSchema from "./otpSchema.js";

export const createOTP = (obj)=> {
    return otpSchema(obj).save()
}