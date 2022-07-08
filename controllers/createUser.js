const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require("../models/user");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  //Validate the request body
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please enter all fields",
    });
  }

  //Check if user already exists
  const userRes = await Users.findOne({ email });
  if (userRes) return res.status(400).json({ message: "User already exists" });

  const user = new Users({
    name,
    email,
    password,
  });

  try {
    //Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        if (err) throw err;

        user.password = hash;
        const newUser = await user.save();

        //Create JWT
        jwt.sign(
          { id: newUser._id },
          process.env.JWT_SECRET,
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
            });
          }
        );

      });
    });

  } catch (error) {
    res.status(400).json({ message: error.message});
  }
};

module.exports = createUser;
