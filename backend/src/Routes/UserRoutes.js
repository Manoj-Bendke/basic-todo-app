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
import { userJWTSecret } from "../config/config.js"

const UserRouter = express.Router()
UserRouter.post("/create-todos", Auth(userJWTSecret),todoValidator, CreateTodos)
UserRouter.get("/get-all-todos", Auth(userJWTSecret), ShowAllTodos)
UserRouter.put("/edit-todo/:id", Auth(userJWTSecret),todoValidator, EditTodos)
UserRouter.put('/complete-todo/:id',Auth(userJWTSecret), CompleteTodo)
UserRouter.post('/delete-todo/:id',Auth(userJWTSecret), DeleteTodo)
UserRouter.get('/get-completed-todos',Auth(userJWTSecret), GetCompletedTodos)
UserRouter.get('/get-incomplete-todos',Auth(userJWTSecret), GetInProgressTodos)
UserRouter.post("/signIn", signInvalidator, signIn)
UserRouter.post("/signUp", signUpvalidator, signUp)

export { UserRouter }
