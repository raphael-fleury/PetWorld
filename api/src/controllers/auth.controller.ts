import { Router } from "express";
import authService from "../services/auth.service";

const uri = '/';

function useRoutes(
    router: Router,
    service: typeof authService = authService
) {
    router.post('/login', async (req, res) => {
        const email = "" + req.body.email;
        const password = "" + req.body.password;

        const token = await service.login(email, password);
        return res.status(200).send(token);
    })
}

export default { uri, useRoutes };