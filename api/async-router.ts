import express from "express"
import toAsyncRouter from "async-express-decorator";

toAsyncRouter.setMethods(['get', 'post', 'put', 'patch', 'delete', 'all']);
const router = toAsyncRouter(express.Router());

export default router;