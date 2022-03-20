import validator from "validator";
import { pre, prop } from "@typegoose/typegoose";
import { encrypt } from "../encrypt";

@pre<User>('save', function() {
    this.password = encrypt(this.password);
})
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
    })
    public password!: string
}