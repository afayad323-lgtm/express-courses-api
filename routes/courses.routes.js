const { body } = require("express-validator");
const express = require("express");
const router = express.Router();

const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses.controllers");

//crud operations

//create

router
  .route("/")
  .get(getAllCourses)
  .post(
    body("name").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive number"),
    createCourse,
  );

router
  .route("/:id")
  .get(getCourseById)
  .patch(
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("price")
      .optional()
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive number"),
    updateCourse,
  )
  .delete(deleteCourse);

module.exports = router;
