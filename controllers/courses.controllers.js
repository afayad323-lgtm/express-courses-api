const Course = require("../models/models.courses");
const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpstatusText");

const getAllCourses = async (req, res) => {
  try {
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const courses = await Course.find().limit(limit).skip(skip);

    res.status(200).json({ status: httpStatusText.SUCCESS, data: { courses } });
  } catch (err) {
    return res.status(500).json({
      status: httpStatusText.ERROR,
      data: null,
      message: err.message,
      code: 500,
    });
  }
};

const getCourseById = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course)
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: { course: "course not found" },
      });

    res.status(200).json({ status: httpStatusText.SUCCESS, data: { course } });
  } catch (err) {
    return res.status(500).json({
      status: httpStatusText.ERROR,
      data: null,
      message: err.message,
      code: 500,
    });
  }
};

const createCourse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: httpStatusText.FAIL,
        data: { errors: errors.array() },
      });
    }
    const newCourse = await Course.create(req.body);

    res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { newCourse } });
  } catch (err) {
    return res.status(500).json({
      status: httpStatusText.ERROR,
      data: null,
      message: err.message,
      code: 500,
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: httpStatusText.FAIL,
        data: { errors: errors.array() },
      });
    }

    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!course) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: { course: "course not found" },
      });
    }

    res.status(200).json({ status: httpStatusText.SUCCESS, data: { course } });
  } catch (err) {
    return res.status(500).json({
      status: httpStatusText.ERROR,
      data: null,
      message: err.message,
      code: 500,
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    let course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: { course: "course not found" },
      });
    }
    res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
  } catch (err) {
    return res.status(500).json({
      status: httpStatusText.ERROR,
      data: null,
      message: err.message,
      code: 500,
    });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
