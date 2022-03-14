import { getModelForClass } from "@typegoose/typegoose";
import User from "./user";

const userSchema = getModelForClass(User);

export {
    userSchema
}