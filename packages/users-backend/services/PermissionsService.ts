import Permission from "../models/Permission";

export default class PermissionsService {
    public static async createManyPermissions(permissions: string[]) {
        const bulkOps = permissions.map(permission => ({
            updateOne: {
                filter: { name: permission },
                update: { $setOnInsert: { name: permission } },
                upsert: true
            }
        }));

        await Permission.bulkWrite(bulkOps)
    }

    public static async fetchPermissions() {
        return await Permission.find({})
    }
}