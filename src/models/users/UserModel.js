import userSchema from "./UserSchema.js";

export const createNewUser = (obj) => {
    return userSchema(obj).save()
};

export const getUser = (_id) => {
    return userSchema.findById(_id);
}
export const updateUser = (_id, obj) => {
  return userSchema.findByIdAndUpdate(_id, obj, {
    new: true,
  });
};