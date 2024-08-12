import mongoose from "mongoose"

export interface IUser extends mongoose.Document {
    _id: mongoose.ObjectId
    name?: string
    surname?: string
    email: string
    password: string
    role?: {
        _id: mongoose.ObjectId,
        name: string,
        permissions: {
            _id: mongoose.ObjectId,
            name: string
        }[]
    },
    createdBy?: string,
    enable?: string
}