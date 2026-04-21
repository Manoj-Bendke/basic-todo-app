import express from 'express'
import {validator} from '../Middlewares/Validator.js'
import { signIn } from '../Controllers/userControllers/UserSignIn.js'
import { signUp } from '../Controllers/userControllers/UserSignUp.js'
import {userAuth} from '../Middlewares/Auth.js'
import {CreateTodos} from '../Controllers/userControllers/CreateTodos.js'

const UserRouter = express.Router()
UserRouter.post('/create-todos',userAuth,CreateTodos)
// UserRouter.get('/get-all-todos')
// UserRouter.put('/edit-todos')
// UserRouter.put('/complete-task')
// UserRouter.post('/delete-todos')
// UserRouter.get('/get-completed-todos')
// UserRouter.get('/get-incomplete-todos')
UserRouter.post('/signIn',validator,signIn)
UserRouter.post('/signUp',validator,signUp)

export  {UserRouter}