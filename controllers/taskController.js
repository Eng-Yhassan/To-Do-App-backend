const taskModel = require("../models/taskModel");

// Create new Task
const createTask = async (req, res) => {
    try {
        const newData = taskModel(req.body);
        await newData.save();

        res.send(newData)

    } catch (error) {
        res.status(501).json({ message: "Not Created" })
    }
}

// read Task 
const readTask = async (req, res) => {
    try {
        const getData = await taskModel.find();

        if (getData) {
            res.send(getData)
        }
    } catch (error) {
        res.status(501).json({ message: "Can't read it bro" })
    }
}

// read One Task
const readSingleTask = async (req, res) => {

    try {
        const getSingleData = await taskModel.findOne(
            { _id: req.params.id }
        )

        if (getSingleData) {
            res.send(getSingleData)
        }
    } catch (error) {
        res.status(501).json({ message: "Can't get single Data " })
    }

}

// update task 
const updateTask = async (req, res) => {
    try {
        const updateData = await taskModel.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        )

        if (updateData) {
            res.send("updated...")
        }
    } catch (error) {
        res.status(501).json({ message: "Can't update bro" })
    }
}

// delete task
const deleteTask = async (req, res) => {
    try {
        const deleteData = await taskModel.deleteOne(
            { _id: req.params.id }
        )
        if (deleteData) {
            res.send("deleted...")
        }
    } catch (error) {
        res.status(501).json({ message: "can't deleted bro " })
    }

}
module.exports = {
    createTask,
    readTask,
    readSingleTask,
    updateTask,
    deleteTask
}