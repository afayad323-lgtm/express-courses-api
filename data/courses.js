const { v4: uuidv4 } = require("uuid");

const courses = [
  { id: uuidv4(), name: "js course", price: 1000 },
  { id: uuidv4(), name: "python course", price: 1500 },
  { id: uuidv4(), name: "java course", price: 2000 },
];

module.exports = courses;
