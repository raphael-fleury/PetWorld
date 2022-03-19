import express from "express"
import { userSchema } from "../entities/schemas"

const uri = '/users';
const router = express.Router();

function treatValidationError(error) {
    const errors: any[] = [];

    Object.keys(error.errors).forEach(key => {
        errors.push(error.errors[key].properties);
    })

    return errors;
}

router.get('/', async (req, res) => {
    try {
        const users = await userSchema.find();
        res.status(200).send(users);
    }
    catch (error: any) {
        res.status(500).send(error.message);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await userSchema.findById(req.params.id);
        if (!user)
            return res.status(404).send('User not found.');

        res.status(200).send(user);
    }
    catch (error: any) {
        res.status(500).send(error.message);
    }
})

router.post('/', async (req, res) => {
    try {
        const user = await userSchema.create(req.body);
        res.status(200).send(user);
    }
    catch (error: any) {
        if (error.name === "ValidationError")
            return res.status(400).send(treatValidationError(error));

        res.status(500).send(error.message);
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const user = await userSchema.findById(req.params.id);
        if (!user)
            return res.status(404).send('User not found.');

        Object.keys(req.body).forEach(key => {
            user[key] = req.body[key];
        });
        
        await user.save();
        res.status(200).send(user);
    }
    catch (error: any) {
        if (error.name === "ValidationError")
            return res.status(400).send(treatValidationError(error));

        res.status(500).send(error.message);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const user = await userSchema.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).send('User not found.');

        res.status(200).send(user);
    }
    catch (error: any) {
        res.status(500).send(error.message);
    }
})

export default { uri, router};