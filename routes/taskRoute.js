const express = require("express");
const taskController = require("../controllers/taskController")


const router = express.Router();
// create new Tas
router.post("/create/task", taskController.createTask);

// Read New TAsk 
router.get("/read/task", taskController.readTask);

// read One Task
router.get("/readSingle/task/:id", taskController.readSingleTask);

// update task 
router.put("/update/task/:id", taskController.updateTask);

// delete task
router.delete("/delete/task/:id", taskController.deleteTask);


module.exports = router