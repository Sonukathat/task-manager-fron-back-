const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Consistent routes - all under /api/task
router.get("/", taskController.getTasks); // this will be used as /api/task
router.post("/", taskController.createTask); // /api/task
router.put("/update/:id", taskController.updateTask); // /api/task/update/:id
router.put("/checkupdate/:id", taskController.toggleComplete); // /api/task/checkupdate/:id
router.delete("/:id", taskController.deleteTask); // /api/task/:id

module.exports = router;
