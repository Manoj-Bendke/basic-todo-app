import * as z from "zod"

const emailSchema = z.string().email({ message: "Invalid Email Address" })

const firstNameSchema = z
  .string()
  .min(2, { message: "Name should be more than 2 letters" })
  .max(20, { message: "Name should not be more than 20 letters" })

const lastNameSchema = z
  .string()
  .min(2, { message: "Name should be more than 2 letters" })
  .max(20, { message: "Name should not be more than 20 letters" })

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[!@#$%^&*()_+={}\[\]:;"'<,>.?\/\\|~-]/, {
    message: "Password must contain at least one special character",
  })

const todoTitleSchema = z
  .string()
  .max(300, { message: "Todo title cannot be more than 300 words" })
const todoDescriptionSchema = z
  .string()
  .max(400, { message: "Todo Description cannot be more than 400 words" })

const signUpValidatorSchema = z.object({
  email: emailSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  password: passwordSchema,
})

const todoValidatorSchema = z.object({
  title: todoTitleSchema,
  description: todoDescriptionSchema,
})

const todoValidator = (req, res, next) => {
  const result = todoValidatorSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.flatten().fieldErrors,
    })
  }
  next()
}
const signUpvalidator = (req, res, next) => {
  const result = signUpValidatorSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.flatten().fieldErrors,
    })
  }
  next()
}

const signInValidatorSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

const signInvalidator = (req, res, next) => {
  const result = signInValidatorSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.flatten().fieldErrors,
    })
  }
  next()
}

export { signUpvalidator, signInvalidator, todoValidator}
