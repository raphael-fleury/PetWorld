import { Router } from "express";
import { getUserFromToken, isTokenExpired } from "../services/token.service";

export default (router: Router) => {
    router.use(async (req, res, next) => {
        const token = req.headers.authorization ?? "";

        if (!isTokenExpired(token)) {
            req.user = await getUserFromToken(token);
        }
        
        next();
    });
}