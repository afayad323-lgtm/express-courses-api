const usersModel = require("../models/users.model");
const httpStatusText = require("../utils/httpstatusText");
const bcrypt = require("bcryptjs");

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
    const { firstName, lastName, email, password } = req.body;

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
    });

    res.status(201).json({
      status: httpStatusText.SUCCESS,
      data: { user: newUser },
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
        message: "user not found",
      });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      return res.status(400).json({
        status: httpStatusText.FAIL,
        data: null,
        message: "password is invalid",
      });
    }

    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
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
};
