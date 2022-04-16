import { Request, Response, Router } from "express";
import { AuthService } from "../services/auth.service";
import authService from "../services/auth.service";

export class AuthController {
    readonly uri = '/';

    constructor(private service: AuthService) { }

    useRoutes = (router: Router) => {
        router.post('/login', this.login);
    }

    login = async (req: Request, res: Response) => {
        const email = "" + req.body.email;
        const password = "" + req.body.password;

        const token = await this.service.login(email, password);
        return res.status(200).send(token);
    }
}

export default new AuthController(authService);