import bcrypt from 'bcryptjs'

export default class HashingService{

    public static hash(text: string): string {
        return bcrypt.hashSync(text, 10)
    }

    public static compare(text: string, hash: string): boolean {
        return bcrypt.compareSync(text, hash)
    }
}