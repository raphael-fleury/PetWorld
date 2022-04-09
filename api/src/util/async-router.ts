import express from "express"
import useAuthentication from "../middlewares/authentication";
import toAsyncRouter from "async-express-decorator";

toAsyncRouter.setMethods(['get', 'post', 'put', 'patch', 'delete', 'all']);

function createRouter(): express.Router {
    const router = toAsyncRouter(express.Router())
    useAuthentication(router);
    return router;
}

export default createRouter;