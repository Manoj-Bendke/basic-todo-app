import bcrypt from "bcrypt"
import { User } from "../../models/Schema.js"

async function signUp(req, res) {
  const { firstName, lastName, email, password } = req.body
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      res
        .status(400)
        .json({ error: "Something went wrong while hashing password" })
    }
    try {
      await User.create({ firstName, lastName, email, password: hash, role:'user'})
      res.status(201).json({ message: "You have signed Up" })
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: "User creation Failed" })
    }
  })
}

export { signUp }
