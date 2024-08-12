import mongoose, { PaginateModel } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { IUser } from './interfaces/IUser'

const UserSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: false
    },
    surname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    enable: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

UserSchema.plugin(mongoosePaginate)

export default mongoose.model<IUser, PaginateModel<IUser>>('User', UserSchema)