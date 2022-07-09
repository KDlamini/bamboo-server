const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const Users = require("../models/user");

// @desc    POST new user registration
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  //Validate the request body
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please enter all fields",
      status: 400,
    });
  }

  //Check if user already exists
  const userRes = await Users.findOne({ email });
  if (userRes) return res.status(400).json({ message: "User already exists", status: 400 });

  const user = new Users({
    name,
    email,
    password,
  });

  //Create salt & hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, async (err, hash) => {
      if (err) throw err;

      user.password = hash;
      const newUser = await user.save();

      //Create JWT
      jwt.sign(
        { id: newUser._id },
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;

          res.status(200).json({
            token,
            user: {
              type: "user",
              id: newUser._id,
              name: newUser.name,
              email: newUser.email,
            },
            status: 200,
            message: "User created successfully",
          });
        }
      );

    });
  });
};

module.exports = createUser;
