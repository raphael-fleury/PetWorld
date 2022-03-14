import validator from "validator";
import { prop } from "@typegoose/typegoose";
import { encrypt } from "../encrypt";

export default class User {
    @prop({ required: true })
    public name!: string

    @prop({
        required: true,
        unique: true,
        validate: [ validator.isEmail, 'Invalid email' ]
    })
    public email!: string

    @prop({
        required: true,
        minlength: [ 8, "Password must be at least 8 characters long"],
        set: encrypt
    })
    public password!: string
}