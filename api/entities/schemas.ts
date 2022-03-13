import { getModelForClass } from "@typegoose/typegoose";
import User from "./user";

export default {
    user: getModelForClass(User)
}