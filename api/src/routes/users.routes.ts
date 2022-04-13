import { userModel } from "../entities/models"
import { Router } from "express";

const uri = '/users';

function useRoutes(router: Router) {
    router.get('/', async (req, res) => {
        const users = await userModel.find();
        res.status(200).send(users);
    })
    
    router.get('/:id', async (req, res) => {
        const user = await userModel.findById(req.params.id);
        if (!user)
            return res.status(404).send('Resource not found.');
    
        res.status(200).send(user);
    })
    
    router.post('/', async (req, res) => {
        const user = await userModel.create(req.body);
        res.status(200).send(user);
    })
    
    router.patch('/:id', async (req, res) => {
        const user = await userModel.findById(req.params.id);
        if (!user)
            return res.status(404).send('Resource not found.');
    
        Object.keys(req.body).forEach(key => {
            user[key] = req.body[key];
        });
        
        await user.save();
        res.status(200).send(user);
    })
    
    router.delete('/:id', async (req, res) => {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).send('Resource not found.');
    
        res.status(200).send(user);
    })
}

export default { uri, useRoutes };