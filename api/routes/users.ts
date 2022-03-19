import { Application } from "express"
import { userSchema } from "../entities/schemas"

function treatValidationError(error) {
    const errors: any[] = [];

    Object.keys(error.errors).forEach(key => {
        errors.push(error.errors[key].properties);
    })

    return errors;
}

export default (app: Application) => {
    app.get('/users', async (req, res) => {
        try {
            const users = await userSchema.find();
            res.status(200).send(users);
        }
        catch (error: any) {
            res.status(500).send(error.message);
        }
    })

    app.get('/users/:id', async (req, res) => {
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

    app.post('/users', async (req, res) => {
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
    
    app.patch('/users/:id', async (req, res) => {
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

    app.delete('/users/:id', async (req, res) => {
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
}