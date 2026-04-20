import express from 'express'
import {validator} from '../Middlewares/Validator.js'
import { signIn } from '../Controllers/userControllers/UserSignIn.js'
import { signUp } from '../Controllers/userControllers/UserSignUp.js'

const UserRouter = express.Router()
// router.post('/create-todos')
// router.get('/get-all-todos')
// router.put('/edit-todos')
// router.put('/complete-task')
// router.post('/delete-todos')
// router.get('/get-completed-todos')
// router.get('/get-incomplete-todos')
UserRouter.post('/signIn',validator,signIn)
UserRouter.post('/signUp',validator,signUp,()=>{console.log("hi from router");})

export  {UserRouter}