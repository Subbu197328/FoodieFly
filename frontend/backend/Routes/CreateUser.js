const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "f0b74cd5e4825f79be7ff940346eb3b83f4fee53ad257822d43ee5f857e9f8b1";

router.post("/createuser", [
    body('email', 'Enter valid email').isEmail(),
    body('name', 'Enter valid username').isLength({ min: 5 }),
    body('password', 'Enter valid password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);

        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            });
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    });

router.post("/loginuser", [
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Enter valid password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct Email" });
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try logging with correct Password" });
            }

            const data = {
                user: {
                    id: userData.id,
                }
            };
            const authToken = jwt.sign(data, jwtSecret);
            return res.json({ success: true, authToken: authToken });

        } catch (error) {
            console.log(error); // Fixed the typo here
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    });

module.exports = router;
