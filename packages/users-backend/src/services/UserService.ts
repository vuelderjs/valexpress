import User from '../models/User'
import RoleService from '../models/Role' 
import { HashingService, JwtService, NotFoundError, UnauthenticatedError } from '@valexpress/common-backend'
import { IUser } from '../models/interfaces/IUser'
import { UserInput } from '../types/UserInput'
import mongoose from 'mongoose'

const passwordValidator = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    if(!regex.test(password)) throw new Error('Password must have at least 8 characters, one uppercase, one lowercase, one number and one special character')
}

export default class UserService{

    public static async createSuperUser(){
        const superUserRole = await RoleService.findOne({name: 'SUPER_USER'})

        if(!superUserRole) {
            throw new Error('Super user role not found')
        }

        const user = {
            name: 'root',
            surname: 'root',
            email: 'root@root.com',
            password: HashingService.hash('root.123'),
            role: superUserRole._id,
            createdBy: 'system',
            enable: true
        }

        const userRoot = await User.findOne({role: superUserRole._id, createdBy: 'system'})

        if(!userRoot){
            console.log('Usuario root creado: ', {
                email: user.email,
                password: 'root.123'
            })
            await User.create(user)
        }
    }

    public static async findUserById(id: string): Promise<void | IUser>{
        const user = await User.findById(id).populate({
            path: 'role',
            populate: { path: 'permissions' }
        })

        if(user) return user
    }

    public static async login(email: string, password: string): Promise<string> {
        const user = await User.findOne({ email })

        if(!user) {
            throw new Error('User or password incorrect')
        }

        if(!HashingService.compare(password, user.password)) {
            throw new Error('User or password incorrect')
        }

        if(!user.enable) {
            throw new Error('User not enabled')
        }

        return JwtService.generateToken({
            _id: user._id
        })
    }

    public static async userGetSession(token: string): Promise<IUser> {
        const userPayload = JwtService.verifyToken(token)

        if(!userPayload) throw UnauthenticatedError

        const user = await UserService.findUserById(userPayload._id)

        if(!user) throw UnauthenticatedError
        if(!user.enable) throw UnauthenticatedError

        return user
    }

    public static async createUser({createdBy, email, password, role}: {createdBy: mongoose.ObjectId, email: string, password: string, role: string}): Promise<IUser> {
        passwordValidator(password)
        
        const passwordHashed = HashingService.hash(password)

        const user = await User.create({createdBy, email, password: passwordHashed, role})
        
        if(!user) throw NotFoundError

        const userPopulated = await User.findById(user._id).populate({
            path: 'role',
            populate: { path: 'permissions' }
        })

        if(!userPopulated) throw NotFoundError

        return userPopulated
    }

    public static async updateUser(id: mongoose.ObjectId, user: UserInput, createdBy?: mongoose.ObjectId): Promise<IUser> {
        if(user.password){
            passwordValidator(user.password)
            user.password = HashingService.hash(user.password)
        }

        const query = createdBy ? { _id: id, createdBy: createdBy } : { _id: id }

        const _user = await User.findOne(query)

        if(!_user) throw NotFoundError

        if(user.enable === false && _user?.createdBy === 'system'){
            throw new Error('Can not disable system user')
        }

        if(user.role && _user?.createdBy === 'system'){
            throw new Error('Can not assign role to system user')
        }

        const __user = await User.findOneAndUpdate(query, user, { new: true }).populate({
            path: 'role',
            populate: { path: 'permissions' }
        })

        if(!__user) throw NotFoundError

        return __user
    }

    public static async updateMany(
        query: {id?: mongoose.ObjectId, email?: string, name?: string, surname?: string, role?: mongoose.ObjectId, createdBy?: string, enable?: boolean},
        setters: {email?: string, name?: string, surname?: string, role?: mongoose.ObjectId, createdBy?: string, enable?: boolean}
    ){
        await User.updateMany(query, setters)
    }

    public static async paginateUsersByFilters(
        filters: {email?: string, name?: string, surname?: string, role?: string, createdBy?: string, enable?: boolean}, 
        sortBy: string, sortDesc: boolean, limit: number = 10, page: number = 1): 
    Promise<
        {
            docs: IUser[],
            page: number,
            limit: number,
            total: number
        }
    > {
        const query = {}

        if(filters?.email) query['email'] = { '$regex': filters.email, '$options': 'i'}
        if(filters?.name) query['name'] = { '$regex': filters.name, '$options': 'i'}
        if(filters?.surname) query['surname'] = { '$regex': filters.surname, '$options': 'i'}
        if(filters?.role) query['role'] = filters.role
        if(filters?.createdBy) query['createdBy'] = { '$regex': filters.createdBy, '$options': 'i'}
        if(filters?.enable) query['enable'] = filters.enable

        const options = {
            populate:{
                path: 'role',
                populate: { path: 'permissions' }
            },
            page: page,
            limit: limit
        }

        if(sortBy) options['sort'] = {[sortBy]: sortDesc ? -1 : 1}
        else options['sort'] = {createdAt: -1}

        //paginate and populate

        const users = await User.paginate(query, options)
        
        return {
            docs: users.docs,
            page: users.page || 0,
            limit: users.limit,
            total: users.totalDocs
        }
    }
}