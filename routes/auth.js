const express = require('express');
const router = express.Router()
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const fetchUser = require('../middleware/middleware')

const JWT_Secret = 'mai@hu#don'

router.post('/create',
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            // find and check an email already exist in database or not... to create user 
            let foundEmail = await User.findOne({ email: req.body.email })
            if (foundEmail) {
                return res.status(400).json({message:"That email already exist !"})
            }
            else {
                //hashing plain text password 
                let salt = await bcrypt.genSalt(10)
                let passwordHash = await bcrypt.hash(req.body.password, salt)

                //creating user if email doesnt exist
                const user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: passwordHash,
                }).catch(err => console.log(err.array()))

                //data that has to be signed with jwt_secret => authtoken
                const data = {
                    id: user.id
                }

                const authToken = jwt.sign(data, JWT_Secret);
                res.send({ authToken })
            }
        }
        catch (error) {
            return res.status(400).json({ error });
        }
    })

router.post('/login',
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            let foundEmail = await User.findOne({ email: req.body.email })
            if (!foundEmail) {
                return res.status(400).json({message:"Enter Wrong Information!"})
            }
            else {
                // checking if user password is matched to the password stored in database
                const checkPass = await bcrypt.compare(req.body.password, foundEmail.password)
                if (!checkPass) {
                    return res.status(400).send("That password doesnt exist !")
                }

                const payload = {

                    id: foundEmail.id

                }
                const authToken = jwt.sign(payload, JWT_Secret);
                res.send({ authToken })
            }
        }
    })

router.get('/fetchuser', fetchUser, async (req, res) => {
    const userId = req.user
    let user = await User.findById(userId)
    res.send({ user })

})
module.exports = router