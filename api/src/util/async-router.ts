import express from "express"
import toAsyncRouter from "async-express-decorator";

toAsyncRouter.setMethods(['get', 'post', 'put', 'patch', 'delete', 'all']);

function createRouter(): express.Router {
    return toAsyncRouter(express.Router())
}

export default createRouter;