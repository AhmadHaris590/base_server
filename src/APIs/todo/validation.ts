import Joi from 'joi'

export const createTodoSchema = Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().trim().optional().allow(null, ''),
})

export const updateTodoSchema = Joi.object({
    title: Joi.string().trim().optional(),
    description: Joi.string().trim().optional().allow(null, ''),
    isCompleted: Joi.boolean().optional(),
})
