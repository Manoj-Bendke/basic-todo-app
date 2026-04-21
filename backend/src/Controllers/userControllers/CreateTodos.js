import { Todo } from "../../models/Schema.js"

async function CreateTodos(req, res) {
  const { UserId, title, status } = req.body
  if (!title) {
    res.status(400).json({ error: "Nothing to create....Title is empty" })
  }

  try {
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

export { CreateTodos }
