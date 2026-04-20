import express from 'express'
import {validator} from '../Middlewares/Validator.js'
import {signUp} from '../Controllers/adminControllers/AdminSignUp.js'
import {signIn} from '../Controllers/adminControllers/AdminSignIn.js'
const AdminRouter = express.Router()

AdminRouter.post('/signIn',validator,signIn)
AdminRouter.post('/signUp',validator,signUp)


export  {AdminRouter}