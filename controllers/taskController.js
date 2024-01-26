const express = require('express')
const tasks = express.Router({ mergeParams: true })
const { getTasks, getTask, createTask, updateTask, deleteTask } = require('../queries/tasks')
const { authenticateToken } = require('../auth/auth')

tasks.get('/', authenticateToken, async (req, res ) => {
    try {
        const { user_id } = req.params
        const tasks = await getTasks(user_id)
        res.status(200).json(tasks)
    } catch (error) {
        res.status(404).json({ error: error })
    }
})

tasks.get('/:id', authenticateToken, async (req, res) => {
    try {
        const { id, user_id } = req.params
        const task = await getTask(id, user_id)
        res.status(200).json(task)
    } catch (error) {
        res.status(404).json({ error: error })
    }
})

tasks.post('/', authenticateToken, async (req, res) => {
    try {
        const createdTask = await createTask(req.body) 
        res.status(200).json(createdTask)
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }

})

tasks.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params
        const updatedTask = await updateTask(id, req.body)
        res.status(200).json(updatedTask)
    } catch (error) {
        res.status(404).json ({ error: error })
        
    }
})

tasks.delete(":id/", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params
        const deletedTask = await deleteTask(id)
        res.status(200).json({ message: "Sucessfully deleted task" })
    } catch (error) {
        res.status(404).json({ error: error })
    }
})

module.exports = tasks