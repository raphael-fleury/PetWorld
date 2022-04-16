import { useControllers } from "./controllers";
import { createExpressApp } from "./util/express-app";

const app = createExpressApp();

app.get('/', (req, res) => {
    res.status(200).send('Hello world.');
})

useControllers(app);

export default app;