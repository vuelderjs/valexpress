import { z } from 'zod'

export const UserSchema = z.object({
    id: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.object({
        id: z.string(),
        name: z.string(),
        permissions: z.array(z.object({
            id: z.string(),
            name: z.string()
        }))
    }),
    name: z.string().optional(),
    surname: z.string().optional(),
    enable: z.boolean()
})

export const UserGetSessionSchema = z.object({
    data: z.object({
        userGetSession: UserSchema
    })
})

export type User = z.infer<typeof UserSchema>

export type UserGetSession = z.infer<typeof UserGetSessionSchema>