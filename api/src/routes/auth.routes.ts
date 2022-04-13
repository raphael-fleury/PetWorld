import { Router } from "express";
import { login } from "../services/auth.service";

const uri = '/';

function useRoutes(router: Router) {
    router.post('/login', async (req, res) => {
        const email = "" + req.body.email;
        const password = "" + req.body.password;

        const token = await login(email, password);
        return res.status(200).send(token);
    })
}

export default { uri, useRoutes };