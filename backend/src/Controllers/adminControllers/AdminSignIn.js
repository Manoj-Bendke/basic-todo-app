import bcrypt from "bcrypt";
import { User } from "../../models/Schema.js";
import jwt from "jsonwebtoken";
import { adminJWTSecret } from "../../config/config.js";
async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && user.role === "admin") {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign({ Id: user._id }, adminJWTSecret, {
          expiresIn: "1h",
        });
        req.headers.authorization = token;
        res.status(200).json({ message: "Admin signed in successfully" });
      } else {
        res.status(401).json({ error: "Incorrect email or password" });
      }
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (e) {
    res.status(400).json({ e: "something went wrong while signing IN" });
  }
}

export { signIn };
