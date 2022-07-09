const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const Users = require("../models/user");

// @desc    Login user
const authUser = async (req, res) => {
  const { email, password } = req.body;

  //Validate the request body
  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter all fields",
    });
  }

  //Check if user exists
  const user = await Users.findOne({ email });
  if (!user) return res.status(400).json({ message: "User does not exists" });


  //validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  //Create JWT
  jwt.sign(
    { id: user._id },
    config.get('jwtSecret'),
    { expiresIn: 3600 },
    (err, token) => {
      if (err) throw err;

      res.status(200).json({
        token,
        user: {
          type: "user",
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    }
  );

};

// @desc    Get user data
const getAuthUser = async (req, res) => {
  const user = await Users.findById(req.user.id).select('-password');
  res.json(user);
}

module.exports = { authUser, getAuthUser};
