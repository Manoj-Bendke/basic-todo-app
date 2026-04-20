import dotenv from 'dotenv'
dotenv.config()

const dbconnecturl = process.env.DB_URL
const userJWTSecret = process.env.USER_JWT_SECRET
const adminJWTSecret = process.env.ADMIN_JWT_SECRET

export {dbconnecturl,userJWTSecret,adminJWTSecret}