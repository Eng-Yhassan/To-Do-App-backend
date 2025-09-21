const express = require("express");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();
// create new Tas
router.post("/create/task", authMiddleware , taskController.createTask);

// Read New TAsk 
router.get("/read/task",authMiddleware, taskController.readTask);

// read One Task
router.get("/readSingle/task/:id", authMiddleware,taskController.readSingleTask);

// update task 
router.put("/update/task/:id", authMiddleware , taskController.updateTask);

// delete task
router.delete("/delete/task/:id", authMiddleware ,taskController.deleteTask);


module.exports = router