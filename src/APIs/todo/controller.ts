import { NextFunction, Request, Response } from 'express'
import httpResponse from '../../handlers/httpResponse'
import httpError from '../../handlers/errorHandler/httpError'
import asyncHandler from '../../handlers/async'
import Todo from './model'
import { createTodoSchema, updateTodoSchema } from './validation'
import { IAuthenticateRequest } from '../../types/types'
import { validateSchema } from '../../utils/joi-validate'
import { ICreateTodoRequest, IUpdateTodoRequest } from './types'
import { IUserWithId } from '../user/_shared/types/users.interface'

export default {
    create: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { error, payload } = validateSchema<ICreateTodoRequest>(createTodoSchema, req.body)
        if (error) return httpError(next, error, req, 422)

        const request = req as IAuthenticateRequest
        // const userId = (request.authenticatedUser as any)._id
        const userId = (request.authenticatedUser as IUserWithId)._id
        
        const newTodo = await Todo.create({ ...payload, user: userId })
        httpResponse(res, req, 201, 'Todo created successfully', newTodo)
    }),

    getAll: asyncHandler(async (req: Request, res: Response) => {
        const request = req as IAuthenticateRequest
        // const userId = (request.authenticatedUser as any)._id
        const userId = (request.authenticatedUser as IUserWithId)._id
        
        const todos = await Todo.find({ user: userId }).sort({ createdAt: -1 })
        httpResponse(res, req, 200, 'Todos fetched successfully', todos)
    }),

    update: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { error, payload } = validateSchema<IUpdateTodoRequest>(updateTodoSchema, req.body)
        if (error) return httpError(next, error, req, 422)

        const request = req as IAuthenticateRequest
        // const userId = (request.authenticatedUser as any)._id
        const userId = (request.authenticatedUser as IUserWithId)._id
        
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, user: userId },
            { $set: payload },
            { new: true }
        )
        if (!todo) return httpError(next, new Error("Todo not found"), req, 404)
        
        httpResponse(res, req, 200, 'Todo updated successfully', todo)
    }),

    delete: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const request = req as IAuthenticateRequest
        // const userId = (request.authenticatedUser as any)._id
        const userId = (request.authenticatedUser as IUserWithId)._id
        
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: userId })
        if (!todo) return httpError(next, new Error("Todo not found"), req, 404)

        httpResponse(res, req, 200, 'Todo deleted successfully', null)
    })
}
