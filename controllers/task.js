const Task = require('../models/task')

const newTask = async (req,res) => {

    const {title,description} = req.body;

    try {

        if(!title || !description){
            return res.json({
                success: false,
                message: "Please fill the required details 😒"
            })
        } 

        const task = await Task.create({title,description,user:req.user});

        res.status(201).json({
            success: true,
            message: "Task created successfully 😎",
            task,
        })
        
    } catch (error) {
        res.json({
            success: false,
            error
        })
    }
}

const getTasks = async (req,res) => {

    try {

        const tasks = await Task.find({user:req.user})

        if(tasks.length<1){
            return res.status(404).json({
                success: false,
                message: "You haven't created any task 😗"
            })
        }

        res.status(200).json({
            success: true,
            tasks
        })
        
    } catch (error) {
        res.json({
            success: false,
            error
        })
    }

}

const updateTask = async (req,res,next) => {

    const {id} = req.params

try {

    const task = await Task.findById(id);

    task.isCompleted = !task.isCompleted;
    await task.save()

    res.status(200).json({
        success: true,
        message: "Task updated successfully"
    })

} catch (error) {
    res.json({
        success: false,
        error
    })
}
}

const deleteTask = async (req,res,next) => {

    const {id} = req.params;

    try {
    
        await Task.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        })

    } catch (error) {
        res.json({
            success: false,
            error
        })
}
}

module.exports = {newTask,getTasks,updateTask,deleteTask}