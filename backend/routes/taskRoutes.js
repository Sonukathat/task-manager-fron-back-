const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/", taskController.getTasks);
router.post("/api/task", taskController.createTask);
router.put("/api/task/update/:id", taskController.updateTask);
router.put("/task/checkupdate/:id", taskController.toggleComplete);
router.delete("/api/task/:id", taskController.deleteTask);

module.exports = router;