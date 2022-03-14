import validator from "validator";
import { prop } from "@typegoose/typegoose";

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
        minlength: [ 8, "Password needs at least 8 characters"],
        maxlength: [ 24, "Password needs at shorter than 25 characters"]
    })
    public password!: string
}