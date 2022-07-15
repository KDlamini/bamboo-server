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
      status: 400,
    });
  }

  //Check if user exists
  const user = await Users.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User does not exists",
      status: 400
    });
  }


  //validate password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ 
      message: "Invalid password",
      status: 400
    });
  }

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
          role: user.role,
          _id: user._id,
          name: user.name,
          email: user.email,
          billing_address: user.billing_address,
        },
        status: 200,
        message: "Success",
      });
    }
  );

};

// @desc    Get user data
const getAuthUser = async (req, res) => {
  const user = await Users.findById(req.user.id).select('-password');
  res.json({
    user,
    status: 200,
    message: "Success",
  });
}

module.exports = { authUser, getAuthUser};
