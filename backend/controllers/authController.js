const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  try {
    const { username, mail, password } = req.body;

    // check if user exists
    const userExists = await User.exists({ mail: mail.toLowerCase() });
    if (userExists) {
      return res.status(409).send("E-mail already in use");
    }

    // encrypt the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user docs and save in database
    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
    });

    // create jwt token
    const token = jwt.sign(
      {
        userId: user._id,
        mail,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({
      userDetails: {
        mail: user.mail,
        token: token,
        username: user.username,
        _id: user._id,
      },
    });
  } catch (error) {
    return res.status(500).send("Error occured. Please try again");
  }
};
exports.login = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await User.findOne({ mail: mail.toLowerCase() });
    if (user && (await bcrypt.compare(password, user.password))) {
      // send new token
      const token = jwt.sign(
        {
          userId: user._id,
          mail,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "24h",
        }
      );

      return res.status(200).json({
        userDetails: {
          mail: user.mail,
          token: token,
          username: user.username,
          _id: user._id,
        },
      });
    }

    return res.status(400).send("Invalid credentials. Please try again");
  } catch (error) {
    return res.status(500).send("Error occured. Please try again");
  }
};
