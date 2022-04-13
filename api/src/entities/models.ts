import { getModelForClass } from "@typegoose/typegoose";
import User from "./user";

export const userModel = getModelForClass(User);