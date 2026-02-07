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
    const { identifier, password } = req.body;
    // validation
    if(!identifier || !password) {
        return res.status(400).json({
            message: "Please provide required data!",
        })
    }
    // fetch user from db
    try {
        // fetch from db
        const user = User.findOne({ identifier });
        // validate
        if (!user) {
            return res.status(400).json({
                message: "invalid credentials",
            })
        }
        // match passwords
        const isCorrectPsw = await bcrypt.compare(password, user.password);
        return res.status(201).json({
            data: user,
            message: "Signed In successfully",
        });
    } catch(error) {
        return res.json({
            status: error.status,
            message: error.message
        });
    }
}