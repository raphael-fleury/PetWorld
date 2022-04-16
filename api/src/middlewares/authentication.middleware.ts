import { Router } from "express";
import tokenService from "../services/token.service";

export default (router: Router) => {
    router.use(async (req, res, next) => {
        const token = req.headers.authorization ?? "";

        if (!tokenService.isTokenExpired(token)) {
            req.user = await tokenService.getUserFromToken(token);
        }
        
        next();
    });
}