import mongoose, { Schema } from 'mongoose'
import { ITodo } from './types'

const todoSchema = new Schema<ITodo>(
    {
        title: { type: String, required: true },
        description: { type: String, default: null },
        isCompleted: { type: Boolean, default: false },
        user: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        }
    },
    { timestamps: true }
)

export default mongoose.model<ITodo>('Todo', todoSchema)
