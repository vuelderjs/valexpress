import Role from "../models/Role"
import Permission from "../models/Permission"
import UserService from './UserService';
import mongoose from "mongoose";

export default class RoleService {
    public static async createSuperUserRole() {
        const role = {
            name: 'SUPER_USER',
            createdBy: 'system'
        }

        const permissions = await Permission.find()

        await Role.findOneAndUpdate({...role}, { ...role, permissions: permissions.map(permission => permission._id) }, { upsert: true })
    }

    public static async createCommonUserRole() {
        const role = {
            name: 'VOID_USER',
            createdBy: 'system'
        }

        await Role.findOneAndUpdate({...role}, { ...role }, { upsert: true })
    }

    public static async fetchAll() {
        return await Role.find().populate('permissions')
    }

    public static async createRole(role: {name: string, permissions: string[], createdBy: mongoose.ObjectId}) {
        const _role = await Role.create(role)

        return await Role.findOne({ _id: _role._id }).populate('permissions').sort({ createdAt: -1 })
    }

    public static async updateRole(id: mongoose.ObjectId, role: {name: string, permissions: string[]}) {

        return await Role.findOneAndUpdate({ _id: id, createdBy: { $ne: 'system' } }, role, { new: true }).populate('permissions')

    }

    public static async deleteRole(id: mongoose.ObjectId) {
        const VoidUser = await Role.findOne({ name: 'VOID_USER' })

        if(!VoidUser) throw new Error('VOID_USER role not found')

        const roleDelete = await Role.findOneAndDelete({ _id: id, createdBy: { $ne: 'system' } }).populate('permissions')

        if(!roleDelete) throw new Error('Role not found')

        await UserService.updateMany({ role: roleDelete.id }, { role: VoidUser.id, enable: false })

        return 
    }
}