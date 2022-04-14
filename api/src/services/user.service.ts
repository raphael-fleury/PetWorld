import User from "../entities/user";
import NotFoundError from "./errors/not-found.error";
import { userModel } from "../entities/models";

type PartialUser = {
    [P in keyof User]?: User[P];
}

export async function find(filter: PartialUser) {
    return await userModel.find(filter).lean();
}

export async function findById(id: string) {
    const user = await userModel.findById(id).lean();
    if (!user) { throw new NotFoundError("User not found.") }

    return user;
}

export async function create(payload: User) {
    const user = await userModel.create(payload);
    return user.toObject();
}

export async function edit(id: string, payload: PartialUser) {
    const user = await userModel.findById(id);
    if (!user) { throw new NotFoundError("User not found.") }

    Object.keys(payload).forEach(key => {
        user[key] = payload[key];
    });

    return (await user.save()).toObject();
}

export async function deleteById(id: string) {
    const user = await userModel.findByIdAndDelete(id).lean();
    if (!user) { throw new NotFoundError("User not found.") }

    return user;
}