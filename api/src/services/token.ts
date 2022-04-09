import { userSchema } from "../entities/schemas";
import jwt from "jsonwebtoken";

const secret = "HAHAHAHAHAHAHAHA";
const expiresIn = "7d";

function createToken(payload: any) {
    return jwt.sign(payload, secret, { expiresIn });
}

async function getUserFromToken(token: string) {
    if (!token || !token.length) { return }

    const payload = jwt.decode(token);
    if (!payload || !payload['user']) { return }

    const user = await userSchema.findById(payload['user']);
    if (!user) { return }

    return user;
}

function isTokenExpired(token: string) {
    try {
        jwt.verify(token, secret);
        return false;
    }
    catch (error) {
        return true;
    }
}

export { createToken, getUserFromToken, isTokenExpired }