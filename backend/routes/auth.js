const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env.local" });
const secretKey = process.env.SECRET_KEY;
var fetchuser = require("../middleware/fetchuser");

//? @route Create  a user using: POST "/api/auth/createuser". Doesn't require auth

router.post(
    "/createuser",
    [
        //? Validating the data entered by the user
        body("name", "Enter a valid name").isLength({ min: 3 }),
        body("email", "Enter a valid email").isEmail(),
        body("password", "Enter a valid password").isLength({ min: 8 }),
    ],
    async (req, res) => {
        //? If there are errors, return Bad request and the errors
        let success = false;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).json({ errors: result.array() });
        }
        try {

            //? Checking whether the user with this email exists already
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res
                    .status(400)
                    .json({ success, error: "Email already exists!!" });
            }
            //? Hashing the password
            const salt = await bcrypt.genSaltSync(10);
            const hash = await bcrypt.hashSync(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
            });
            //? Creating a JWT token
            const data = {
                user: {
                    id: user.id,
                },
            };
            //? Signing the JWT token
            const authToken = jwt.sign(data, secretKey);
            success = true;
            res.status(200).json({ success, authToken: authToken });
        } catch (error) {
            //! If there is an error, return server error
            console.error(error.message);
            res.status(500).send("Error Occured !!");
        }
    }
);

//? @route Authenticate a user using: POST "/api/auth/login".

router.post(
    "/login",
    [
        //? Validating the data entered by the user
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password cannot be blank").exists(),
    ],
    async (req, res) => {
        //? If there are errors, return Bad request and the errors
        let success = false;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).json({ success, errors: result.array() });
        }
        const { email, password } = req.body;
        try {
            //? Checking whether the user with this email exists already
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    success,
                    error: "Please try to login with correct credentials",
                });
            }
            //? Comparing the password entered by the user with the hashed password
            const passwordCompare = await bcrypt.compare(
                password,
                user.password
            );
            if (!passwordCompare) {
                return res.status(400).json({
                    success,
                    error: "Please try to login with correct credentials",
                });
            }
            //? Creating a JWT token
            const data = {
                user: {
                    id: user.id,
                },
            };
            //? Signing the JWT token
            const authToken = jwt.sign(data, secretKey);
            success = true;
            res.status(200).json({ success, authToken: authToken });
        } catch (error) {
            //! If there is an error, return server error
            console.error(error.message);
            res.status(500).send("Error Occured !!");
        }
    }
);

//? @route Get loggedin user details using: POST "/api/auth/getuser". Login required

router.post("/getuser", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error Occured !!");
    }
});
module.exports = router;
