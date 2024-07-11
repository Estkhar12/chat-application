import bcrypt from "bcryptjs";

export const hashPassword = async(password) => {
    try {
        const hashedpassword = await bcrypt.hash(password, 12);
        return hashedpassword;
    } catch (error) {
        res.status(500).json(error)
    }
}

export const comparePassword = async(password, hashPassword) =>{
    try {
        return bcrypt.compare(password, hashPassword)
    } catch (error) {
        res.status(500).json(error)
    }
}