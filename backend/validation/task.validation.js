import Joi from "joi";

export const CreateTask = Joi.object({
  title: Joi.string()
    .required()
    .messages({
      "any.required": "Task title is required",
      "string.empty": "Task title cannot be empty",
    }),

  description: Joi.string()
    .required()
    .messages({
      "any.required": "Task description is required",
      "string.empty": "Task description cannot be empty",
    }),

  userId: Joi.string()
    .required()
    .messages({
      "any.required": "User ID is required",
      "string.empty": "User ID is required",
    }),
});
