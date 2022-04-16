import { Router, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { Controller } from ".";
import userService from "../services/user.service";
import User from "../entities/user";

export class UserController implements Controller {
    readonly uri = '/users'

    constructor(private service: UserService) { }

    useRoutes = (router: Router) => {
        router.get('/', this.find);
        router.get('/:id', this.findById);
        router.post('/', this.create);
        router.patch('/:id', this.edit)
        router.delete('/:id', this.delete)
    }

    find = async (req: Request, res: Response) => {
        const users = await this.service.find(req.query);
        res.status(200).send(users.map(sanitize));
    }

    findById = async (req: Request, res: Response) => {
        const user = await this.service.findById(req.params.id);
        res.status(200).send(sanitize(user));
    }

    create = async (req: Request, res: Response) => {
        const user = await this.service.create(req.body);
        res.status(200).send(sanitize(user));
    }

    edit = async (req: Request, res: Response) => {
        const user = await this.service.edit(req.params.id, req.body);
        res.status(200).send(sanitize(user));
    }

    delete = async (req: Request, res: Response) => {
        const user = await this.service.deleteById(req.params.id);
        res.status(200).send(sanitize(user));
    }
}

function sanitize(user: Omit<User, "password">) {
    delete user['password'];
    delete user['__v'];
    return user;
}

export default new UserController(userService);