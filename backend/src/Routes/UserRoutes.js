import express from "express"
import { validator } from "../Middlewares/Validator.js"
import { signIn } from "../Controllers/userControllers/UserSignIn.js"
import { signUp } from "../Controllers/userControllers/UserSignUp.js"
import { Auth } from "../Middlewares/Auth.js"
import {
  CreateTodos,
  ShowAllTodos,
  EditTodos,
  DeleteTodo,
  CompleteTodo,
  GetCompletedTodos,
  GetInProgressTodos,
} from "../Controllers/userControllers/TodoActions.js"
import { userJWTSecret } from "../config/config.js"

const UserRouter = express.Router()
UserRouter.post("/create-todos", Auth(userJWTSecret), CreateTodos)
UserRouter.get("/get-all-todos", Auth(userJWTSecret), ShowAllTodos)
UserRouter.put("/edit-todos", Auth(userJWTSecret), EditTodos)
UserRouter.put('/complete-todos',Auth(userJWTSecret), CompleteTodo)
UserRouter.post('/delete-todos',Auth(userJWTSecret), DeleteTodo)
UserRouter.get('/get-completed-todos',Auth(userJWTSecret), GetCompletedTodos)
UserRouter.get('/get-incomplete-todos',Auth(userJWTSecret), GetInProgressTodos)
UserRouter.post("/signIn", validator, signIn)
UserRouter.post("/signUp", validator, signUp)

export { UserRouter }
