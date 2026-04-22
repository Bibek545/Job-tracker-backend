import userSchema from "./UserSchema.js";

export const createNewUser = (obj) => {
    return userSchema(obj).save()
}
