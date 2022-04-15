import { Router } from "express";
import catchErrors from "./catch-errors.middleware";
import useAuthentication from "./authentication.middleware";

export function usePreMiddlewares(router: Router) {
    useAuthentication(router);
}

export function usePostMiddlewares(router: Router) {
    catchErrors(router);
}