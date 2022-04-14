import { find, findById, create, edit, deleteById } from "../services/user.service";
import { Router } from "express";
import User from "../entities/user";

const uri = '/users';

function useRoutes(router: Router) {
    router.get('/', async (req, res) => {
        const users = await find(req.query);
        res.status(200).send(users.map(sanitize));
    })
    
    router.get('/:id', async (req, res) => {
        const user = await findById(req.params.id);
        res.status(200).send(sanitize(user));
    })
    
    router.post('/', async (req, res) => {
        const user = await create(req.body);
        res.status(200).send(sanitize(user));
    })
    
    router.patch('/:id', async (req, res) => {
        const user = await edit(req.params.id, req.body);
        res.status(200).send(sanitize(user));
    })
    
    router.delete('/:id', async (req, res, next) => {
        const user = await deleteById(req.params.id);
        res.status(200).send(sanitize(user));
    })
}

function sanitize(user: Omit<User, "password">) {
    delete user['password'];
    delete user['__v'];
    return user;
}

export default { uri, useRoutes };