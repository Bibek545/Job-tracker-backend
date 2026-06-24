export const generateBasicOTP = () => {
    return Math.floor(10000 + Math.random() * 90000).toString()
};
console.log(generateBasicOTP());