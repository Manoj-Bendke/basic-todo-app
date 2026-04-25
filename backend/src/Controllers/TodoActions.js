import { Todo } from "../models/Schema.js"
import { isBlank } from "../Utils/validate.js"

async function CreateTodos(req, res) {
  const { title, description, status } = req.body
  const UserId = req.UserId
  if (
    isBlank(UserId) ||
    isBlank(title) ||
    isBlank(description) ||
    isBlank(status)
  )
    return res.status(400).json({ error: "Invalid Inputs" })

  try {
    const createdTodo = await Todo.create({
      title: title,
      description: description,
      createdBy: UserId,
      status: status,
    })
    res.status(201).json({ message: "Todo Created", todoId: createdTodo._id })
  } catch (error) {
    res.status(400).json({ message: "Could not create a todo" })
  }
}

async function ShowAllTodos(req, res) {
  const UserId = req.UserId
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit

  try {
    const todos = await Todo.find({ createdBy: UserId }).skip(skip).limit(limit)
    if (todos) {
      res.status(200).send(todos)
    } else {
      res.status(404).json({ message: "No todos available" })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Couldn't fetch todos" })
  }
}

async function EditTodos(req, res) {
  const { title, description, status } = req.body
  const todoId = req.params.id
  const UserId = req.UserId
  if (!mongoose.Types.ObjectId.isValid(todoId)) {
   return res.status(400).json({ error: "Invalid ToDo ID format" });
}
  if (
    isBlank(todoId) ||
    isBlank(title) ||
    isBlank(description) ||
    isBlank(status)
  )
    return res.status(400).json({ error: "Invalid Inputs" })
  todoId.trim()
  try {
    const match = await Todo.findOne({ createdBy: UserId, _id: todoId })
    if (match) {
      const editedTodo = await Todo.updateOne(
        { createdBy: UserId, _id: todoId },
        { $set: { title: title, description: description, status: status } },
      )
      if (editedTodo) {
        return res.status(200).json({ message: "Todo edited Successfully" })
      } else {
        return res.status(400).json({ error: "Could not edit todo" })
      }
    } else {
      return res.status(404).json({ error: "Invalid todo or user id" })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Something went wrong while editing" })
  }
}

async function DeleteTodo(req, res) {
  const UserId = req.UserId
  const todoId = req.params.id
  if (isBlank(todoId))
    return res.status(400).json({ error: "Can't read todoId" })
  todoId.trim()
  try {
    const deletedTodo = await Todo.findOneAndDelete({
      createdBy: UserId,
      _id: todoId,
    })
    if (deletedTodo) {
      return res.status(200).json({ message: "Todo Deleted" })
    } else {
      return res.status(400).json({ message: "Couldn't delete todos" })
    }
  } catch (error) {
    console.log(error)
    return res
      .status(400)
      .json({ message: "Something went wrong while deleting todo" })
  }
}

async function CompleteTodo(req, res) {
  const UserId = req.UserId
  const todoId = req.params.id
  if (isBlank(todoId))
    return res.status(400).json({ error: "Can't read todoId" })

  todoId.trim()
  try {
    const completedtodo = await Todo.findOneAndUpdate(
      { createdBy: UserId, _id: todoId },
      { $set: { status: "completed" } },
    )
    if (completedtodo) {
      return res.status(200).json({ message: "Wohooo Task completed!!" })
    } else {
      return res.status(400).json({ error: "could not complete task" })
    }
  } catch (error) {
    console.log(error)
    res
      .status(400)
      .json({ error: "Something went wrong while completing todos" })
  }
}

async function GetCompletedTodos(req, res) {
  const UserId = req.UserId
  try {
    const todos = await Todo.find({ createdBy: UserId, status: "completed" })
      .skip(10)
      .limit(10)
    if (todos) {
      res.status(200).send(todos)
    } else {
      res.status(404).json({ message: "No Completed todos available" })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Couldn't fetch todos" })
  }
}

async function GetInProgressTodos(req, res) {
  const UserId = req.UserId
  try {
    const todos = await Todo.find({ createdBy: UserId, status: "Inprogress" })
      .skip(10)
      .limit(10)
    if (todos) {
      res.status(200).send(todos)
    } else {
      res.status(404).json({ message: "No Pending todos available" })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Couldn't fetch todos" })
  }
}
export {
  CreateTodos,
  ShowAllTodos,
  EditTodos,
  DeleteTodo,
  CompleteTodo,
  GetCompletedTodos,
  GetInProgressTodos,
}
