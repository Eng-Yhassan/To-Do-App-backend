const taskModel = require("../models/taskModel");

// Create new Task
const createTask = async (req, res) => {
    try {
        // Hubi in user-ka logged-in uu jiro
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // Ku dar userId task-ka
        const newData = new taskModel({
            title: req.body.title,
            description: req.body.description,
            userId: req.user._id
        });

        await newData.save();
        res.status(201).json(newData);

    } catch (error) {
        res.status(500).json({ message: "Task not created", error: error.message });
    }
}

// Read all tasks (only for logged-in user)
const readTask = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const getData = await taskModel.find({ userId: req.user._id });
        res.status(200).json(getData);

    } catch (error) {
        res.status(500).json({ message: "Can't read tasks", error: error.message });
    }
}

// Read One Task
const readSingleTask = async (req, res) => {
    try {
        const getSingleData = await taskModel.findOne({ 
            _id: req.params.id, 
            userId: req.user._id // Hubi in task-ku uu user-ka leeyahay
        });

        if (!getSingleData) return res.status(404).json({ message: "Task not found" });
        res.status(200).json(getSingleData);

    } catch (error) {
        res.status(500).json({ message: "Can't get task", error: error.message });
    }
}

// Update Task
const updateTask = async (req, res) => {
    try {
        const updateData = await taskModel.updateOne(
            { _id: req.params.id, userId: req.user._id }, // Hubi user-ka
            { $set: req.body }
        );

        if (updateData.modifiedCount === 0) {
            return res.status(404).json({ message: "Task not found or nothing to update" });
        }

        res.status(200).json({ message: "Task updated" });

    } catch (error) {
        res.status(500).json({ message: "Can't update task", error: error.message });
    }
}

// Delete Task
const deleteTask = async (req, res) => {
    try {
        const deleteData = await taskModel.deleteOne({ _id: req.params.id, userId: req.user._id });

        if (deleteData.deletedCount === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted" });

    } catch (error) {
        res.status(500).json({ message: "Can't delete task", error: error.message });
    }
}

module.exports = {
    createTask,
    readTask,
    readSingleTask,
    updateTask,
    deleteTask
}
