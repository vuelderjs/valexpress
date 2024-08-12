import jwt from 'jsonwebtoken'

export default class JwtService {
    public static generateToken(payload: any) {
        return jwt.sign(payload, process.env.JWT_SECRET)
    }

    public static verifyToken(token: string) {
        return jwt.verify(token, process.env.JWT_SECRET)
    }
}