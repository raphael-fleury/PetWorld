import { getRouters } from "./controllers";
import { createExpressApp } from "./util/express-app";

const app = createExpressApp();

app.get('/', (req, res) => {
    res.status(200).send('Hello world.');
})

for (const router of getRouters()) {
    app.use(router);
}

export default app;