import bcrypt from "bcryptjs";
const saltRounds = 5; // standard complexity

export const hashPassword = async(password) => {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;// store the hash password in the database
}

export const comparePassword = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
}