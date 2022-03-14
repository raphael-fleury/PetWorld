import { Application } from "express"
import { userSchema } from "../entities/schemas"

export default (app: Application) => {
    app.post('/users', async (req, res) => {
        try {
            const user = await userSchema.create(req.body);
            res.status(200).send(user);
        }
        catch (error: any) {
            res.status(500).send(error.message);
        }
    })
    
    app.put('/users/:id', async (req, res) => {
        try {
            console.log(req.body);
            const user = await userSchema.findById(req.params.id);
            if (!user) return res.status(400).send('User not found.');
            user.password = req.body.password;
            await user.save();
    
            res.status(200).send(user);
        }
        catch (error: any) {
            res.status(500).send(error.message);
        }
    })
}