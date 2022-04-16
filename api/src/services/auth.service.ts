import { userModel } from "../entities/models";
import tokenService from "./token.service";
import NotFoundError from "./errors/not-found.error";
import validator from "validator";
import bcrypt from "bcrypt";

const errorMsg = "E-mail and password do not match with any account.";

export class AuthService {
    async login(email: string, password: string) {
        validatePayload(email, password);
    
        const user = await userModel.findOne({ email });
        if (!user) { throw new NotFoundError(errorMsg) }
    
        validatePassword(password, user.password);
        return tokenService.createToken({ user: user._id });
    }
}

function validatePayload(email: string, password: string) {
    if (!validator.isEmail(email) || password.length < 8) {
        throw new NotFoundError(errorMsg);
    }
}

function validatePassword(password: string, hash: string) {
    if (!bcrypt.compareSync(password, hash)) {
        throw new NotFoundError(errorMsg);
    }
}

export default new AuthService();