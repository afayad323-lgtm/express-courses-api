const courses = require("../data/courses");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

const getAllCourses = (req, res) => {
  res.status(200).json(courses);
};

const getCourseById = (req, res) => {
  const course = courses.find((c) => c.id === req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.status(200).json(course);
};

const createCourse = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const course = {
    id: uuidv4(),
    name: req.body.name,
    price: req.body.price,
  };

  courses.push(course);
  res.status(201).json(course);
};

const updateCourse = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const course = courses.find((c) => c.id === req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });

  const { name, price } = req.body;

  if (name === undefined && price === undefined) {
    return res.status(400).json({ message: "Nothing to update" });
  }

  if (name !== undefined) course.name = name;
  if (price !== undefined) course.price = price;
  res.status(200).json(course);
};

const deleteCourse = (req, res) => {
  const index = courses.findIndex((c) => c.id === req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Course not found" });
  courses.splice(index, 1);
  res.status(200).json({ message: "Course deleted" });
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
