import { Request, Response } from "express";
import { Controller, Post } from "@decorators/express";
import { AuthService } from "../services/auth.service";
import { middlewares } from "../middlewares";
import authService from "../services/auth.service";

@Controller('/', middlewares)
export class AuthController {

    constructor(private service: AuthService = authService) { }

    @Post('/login')
    async login(req: Request, res: Response) {
        const email = "" + req.body.email;
        const password = "" + req.body.password;

        const token = await this.service.login(email, password);
        return res.status(200).send(token);
    }
}

export default new AuthController(authService);