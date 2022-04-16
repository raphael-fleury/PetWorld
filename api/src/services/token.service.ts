import { userModel } from "../entities/models";
import jwt from "jsonwebtoken";

const secret = "HAHAHAHAHAHAHAHA";
const expiresIn = "7d";

export class TokenService {
    createToken(payload: any) {
        return jwt.sign(payload, secret, { expiresIn });
    }
    
    async getUserFromToken(token: string) {
        if (!token || !token.length) { return }
    
        const payload = jwt.decode(token);
        if (!payload || !payload['user']) { return }
    
        const user = await userModel.findById(payload['user']);
        if (!user) { return }
    
        return user;
    }
    
    isTokenExpired(token: string) {
        try {
            jwt.verify(token, secret);
            return false;
        }
        catch (error) {
            return true;
        }
    }
}

export default new TokenService();