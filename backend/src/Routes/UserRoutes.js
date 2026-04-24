import express from "express"
import { signInvalidator,signUpvalidator,todoValidator } from "../Middlewares/Validator.js"
import { signIn } from "../Controllers/UserSignIn.js"
import { signUp } from "../Controllers/UserSignUp.js"
import { Auth } from "../Middlewares/Auth.js"
import {
  CreateTodos,
  ShowAllTodos,
  EditTodos,
  DeleteTodo,
  CompleteTodo,
  GetCompletedTodos,
  GetInProgressTodos,
} from "../Controllers/TodoActions.js"

const UserRouter = express.Router()
UserRouter.get("/get-all-todos", Auth, ShowAllTodos)
UserRouter.post("/create-todos", todoValidator, Auth, CreateTodos)
UserRouter.put("/edit-todo/:id",todoValidator, Auth, EditTodos)
UserRouter.put('/complete-todo/:id',Auth, CompleteTodo)
UserRouter.post('/delete-todo/:id',Auth, DeleteTodo)
UserRouter.get('/get-completed-todos',Auth, GetCompletedTodos)
UserRouter.get('/get-incomplete-todos',Auth, GetInProgressTodos)
UserRouter.post("/signIn", signInvalidator, signIn)
UserRouter.post("/signUp", signUpvalidator, signUp)

export { UserRouter }
