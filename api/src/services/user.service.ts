import User from "../entities/user";
import NotFoundError from "./errors/not-found.error";
import { userModel } from "../entities/models";

type PartialUser = {
    [P in keyof User]?: User[P];
}

export class UserService {
    async find(filter: PartialUser): Promise<User[]> {
        return await userModel.find(filter).lean();
    }
    
    async findById(id: string): Promise<User> {
        const user = await userModel.findById(id).lean();
        if (!user) { throw new NotFoundError("User not found.") }
    
        return user;
    }
    
    async create(payload: User): Promise<User> {
        const user = await userModel.create(payload);
        return user.toObject();
    }
    
    async edit(id: string, payload: PartialUser): Promise<User> {
        const user = await userModel.findById(id);
        if (!user) { throw new NotFoundError("User not found.") }
    
        Object.keys(payload).forEach(key => {
            user[key] = payload[key];
        });
    
        return (await user.save()).toObject();
    }
    
    async deleteById(id: string): Promise<User> {
        const user = await userModel.findByIdAndDelete(id).lean();
        if (!user) { throw new NotFoundError("User not found.") }
    
        return user;
    }
}

export default new UserService();