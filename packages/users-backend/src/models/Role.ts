import mongoose from 'mongoose'

const RoleSchema = new mongoose.Schema({
    createdBy: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    permissions: {
        type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Permission'
            }],
        required: false,
        default: []
    }
}, {
    timestamps: true
})

export default mongoose.model('Role', RoleSchema)