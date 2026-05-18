import { Document, Types } from 'mongoose'

export interface ITodo extends Document {
    title: string;
    description?: string;
    isCompleted: boolean;
    user: Types.ObjectId;
}

export interface ICreateTodoRequest {
    title: string;
    description?: string;
}

export interface IUpdateTodoRequest {
    title?: string;
    description?: string;
    isCompleted?: boolean;
}
