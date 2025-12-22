import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      "any.required": "Name is required",
      "string.empty": "Name is required",
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Valid email is required",
      "any.required": "Email is required",
      "string.empty": "Email is required",
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters",
      "any.required": "Password is required",
      "string.empty": "Password is required",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Valid email is required",
      "any.required": "Email is required",
      "string.empty": "Email is required",
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters",
      "any.required": "Password is required",
      "string.empty": "Password is required",
    }),
});

