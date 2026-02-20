import User from "../db/models/userAccountSchema.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res) => {
    // get data
    const { userName, email, password } = req.body;

    // validate data
    if(!userName || !email || !password) {
        return res.status(400).json({
            message: "Please provide required data!",
        })
    }

    // create new user in db and save
    try {
        //  if user already exists (imp note: finding using two unique values)
        const existingUser = await User.findOne({
            $or: [{ email }, { userName }]
        });

        if(existingUser) {
            return res.status(400).json({
                message: "User already exists!",
                data: {
                    userName: existingUser.userName,
                    email: existingUser.email
                }
            });
        }

        // otherwise create a new user => hash user's password first
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName,
            email,
            password: hashPassword,
        });

        await newUser.save();

        // generate jwt
        const token = jwt.sign(
            {
                id: newUser._id,
                email: newUser.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );

        // set token in http cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 24*7*60*60*1000,
        })

        return res.status(201).json({
            message: "User successfully created",
            data: {
                userName: newUser.userName,
                email: newUser.email
            }
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
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
        const user = await User.findOne({ email });

        // validate user
        if (!user) {
            return res.status(401).json({
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
        // generate jwt
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );

        // set token in http cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 24*7*60*60*1000,
        });

        return res.status(200).json({
            message: "Signed In successfully",
            data: {
                userName: user.userName,
                email: user.email
            }
        });
    } catch(error) {
        return res.status(500).json({
            message: "Server Error(Error while signing in user)",
        })
    }
}

export const signout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    });
    return res.status(200).json({
        message: "Logged out Successfully!",
    });
}