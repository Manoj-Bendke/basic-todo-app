import { Todo } from "../../models/Schema.js"

async function CreateTodos(req, res) {
  const { title, status } = req.body
  const UserId = req.UserId
  if (!title) {
    res.status(400).json({ error: "Nothing to create....Title is empty" })
  }

  try {
    console.log(req.body)
    const createdTodo = await Todo.create({
      title: title,
      createdBy: UserId,
      status: status,
    })
    res.status(201).json({ message: "Todo Created", todid: createdTodo._id })
  } catch (error) {
    res.status(400).json({ message: "Could not create a todo" })
  }
}

async function ShowAllTodos(req, res) {
  const UserId = req.UserId
  try {
    const todos = await Todo.find({ createdBy: UserId })
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
  const { todoId, title, status } = req.body
  const UserId = req.UserId
  todoId.trim()
  try {
    const match = await Todo.findOne({ createdBy: UserId, _id: todoId })
    if (match) {
      const editedTodo = await Todo.updateOne(
        { createdBy: UserId, _id: todoId },
        { $set: { title: title, status: status } },
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
  const { todoid } = req.body
  todoid.trim()
  try {
    const deletedTodo = await Todo.findOneAndDelete({
      createdBy: UserId,
      _id: todoid,
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
  const { todoid } = req.body
  todoid.trim()
  try {
    const completedtodo = await Todo.findOneAndUpdate(
      { createdBy: UserId, _id: todoid },
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
