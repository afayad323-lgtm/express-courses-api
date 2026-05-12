const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authverifytoken");
const userRoles = require("../utils/user.roles");
const allowedTo = require("../middleware/allowTo");

const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses.controllers");

router
  .route("/")
  .get(getAllCourses)
  .post(
    body("title").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive number"),
    verifyToken,
    allowedTo(userRoles.MANAGER),
    createCourse,
  );

router
  .route("/:id")
  .get(getCourseById)
  .patch(
    body("title").optional().notEmpty().withMessage("Name cannot be empty"),
    body("price")
      .optional()
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive number"),
    updateCourse,
  )
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.MANAGER),
    deleteCourse,
  );

module.exports = router;
