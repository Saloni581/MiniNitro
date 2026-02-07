import User from "../db/models/userAccountSchema.js";
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    // get data
    const { userId, email, password } = req.body;
    // validate data
    if(!userId || !email || !password) {
        return res.status(400).json({
            message: "Please provide required data!",
        })
    }
    // if user already exists
    const existingUser = await User.findOne({ email });
    if(existingUser) {
        return res.status(400).json({
            message: "User already exists!",
        })
    }

    // otherwise create a new user => hash user's password first
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // create new user in db and save
    try {
        const newUser = new User({
            userId: userId,
            email: email,
            password: hashPassword,
        });
        const savedUser = await newUser.save();
        console.log("User created successfully", savedUser);
        return res.status(201).json({
            message: "User successfully created",
        });
    } catch(error) {
        return res.json({
            status: error.status,
            message: error.message
        })
    }
}

export const signin = async (req, res) => {
    // get data
    const { email, password } = req.body;
    // validation
    if(!email || !password) {
        return res.status(400).json({
            message: "Please provide required data!",
        })
    }
    // fetch user from db
    try {
        // fetch from db
        //@ts-ignore
        const user = await User.findOne({ email });
        // validate
        if (!user) {
            return res.status(400).json({
                message: "invalid credentials",
            })
        }
        // match passwords
        const isCorrectPsw = await bcrypt.compare(password, user.password);
        if(!isCorrectPsw) {
            return res.status(400).json({
                message: "invalid password",
            });
        }
        return res.status(200).json({
            message: "Signed In successfully",
            data: {
                userId: user.userId,
                email: user.email
            }
        });
    } catch(error) {
        return res.status(500).json({
            message: "Server Error(Error while signing in user)",
        })
    }
}