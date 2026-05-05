const Course = require("../models/models.courses");
const { validationResult } = require("express-validator");

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json(courses);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getCourseById = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (err) {
    return res.status(400).json({ msg: "invalid id" });
  }
};

const createCourse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newCourse = await Course.create(req.body);

    res.status(201).json(newCourse);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const updateCourse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!course) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.status(200).json(course);
  } catch (err) {
    return res.status(400).json({ msg: "invalid id" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    let course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted" });
  } catch (err) {
    return res.status(400).json({ msg: "invalid id" });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
