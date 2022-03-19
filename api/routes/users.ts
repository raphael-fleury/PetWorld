import asyncRouter from "../async-router"
import catchErrors from "../middlewares/catch-errors";
import { userSchema } from "../entities/schemas"

const uri = '/users';
const router = asyncRouter;

router.get('/', async (req, res) => {
    const users = await userSchema.find();
    res.status(200).send(users);
})

router.get('/:id', async (req, res) => {
    const user = await userSchema.findById(req.params.id);
    if (!user)
        return res.status(404).send('Resource not found.');

    res.status(200).send(user);
})

router.post('/', async (req, res) => {
    const user = await userSchema.create(req.body);
    res.status(200).send(user);
})

router.patch('/:id', async (req, res) => {
    const user = await userSchema.findById(req.params.id);
    if (!user)
        return res.status(404).send('Resource not found.');

    Object.keys(req.body).forEach(key => {
        user[key] = req.body[key];
    });
    
    await user.save();
    res.status(200).send(user);
})

router.delete('/:id', async (req, res) => {
    const user = await userSchema.findByIdAndDelete(req.params.id);
    if (!user)
        return res.status(404).send('Resource not found.');

    res.status(200).send(user);
})

catchErrors(router);
export default { uri, router };