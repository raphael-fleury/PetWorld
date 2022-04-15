import userService from "../services/user.service";
import User from "../entities/user";
import { Router } from "express";

const uri = '/users';

function useRoutes(
    router: Router,
    service: typeof userService = userService
) {
    router.get('/', async (req, res) => {
        const users = await service.find(req.query);
        res.status(200).send(users.map(sanitize));
    })
    
    router.get('/:id', async (req, res) => {
        const user = await service.findById(req.params.id);
        res.status(200).send(sanitize(user));
    })
    
    router.post('/', async (req, res) => {
        const user = await service.create(req.body);
        res.status(200).send(sanitize(user));
    })
    
    router.patch('/:id', async (req, res) => {
        const user = await service.edit(req.params.id, req.body);
        res.status(200).send(sanitize(user));
    })
    
    router.delete('/:id', async (req, res, next) => {
        const user = await service.deleteById(req.params.id);
        res.status(200).send(sanitize(user));
    })
}

function sanitize(user: Omit<User, "password">) {
    delete user['password'];
    delete user['__v'];
    return user;
}

export default { uri, useRoutes };