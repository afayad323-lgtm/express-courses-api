const usersModel = require("../models/users.model");
const httpStatusText = require("../utils/httpstatusText");
const bcrypt = require("bcryptjs");
const rateLimit = require("express-rate-limit");

const generateJWT = require("../utils/generateJWT");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    status: httpStatusText.ERROR,
    message: "Too many login attempts, please try again later",
  },
});

const getAllUsers = async (req, res) => {
  try {
    const users = await usersModel.find({}, { password: false });
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { users } });
  } catch (err) {
    return res.status(500).json({
      status: httpStatusText.ERROR,
      data: null,
      code: 500,
      message: err.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const oldUser = await usersModel.findOne({ email });

    if (oldUser) {
      return res.status(400).json({
        status: httpStatusText.FAIL,
        data: null,
        message: "user already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await usersModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateJWT({
      email: newUser.email,
      id: newUser._id,
      role: newUser.role,
    });

    res.status(201).json({
      status: httpStatusText.SUCCESS,
      data: {
        user: {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          userRole: newUser.role,
        },
        token,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: httpStatusText.ERROR,
      data: null,
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: httpStatusText.FAIL,
        data: null,
        message: "email & password are required",
      });
    }

    const user = await usersModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: httpStatusText.FAIL,
        data: null,
        message: "Invalid email or password",
      });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      return res.status(400).json({
        status: httpStatusText.FAIL,
        data: null,
        message: "Invalid email or password",
      });
    }

    const token = generateJWT({
      email: user.email,
      id: user._id,
      role: user.role,
    });

    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          token: token,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: httpStatusText.ERROR,
      data: null,
      code: 500,
      message: err.message,
    });
  }
};

module.exports = {
  getAllUsers,
  register,
  login,
  loginLimiter,
};
