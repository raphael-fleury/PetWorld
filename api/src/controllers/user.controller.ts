import { Request, Response } from "express";
import { Controller, Delete, Get, Patch, Post } from "@decorators/express";
import { UserService } from "../services/user.service";
import userService from "../services/user.service";
import User from "../entities/user";

@Controller('/users')
export class UserController {

    constructor(private service: UserService = userService) { }

    @Get('/')
    async find(req: Request, res: Response) {
        const users = await this.service.find(req.query);
        res.status(200).send(users.map(sanitize));
    }

    @Get('/:id')
    async findById(req: Request, res: Response) {
        const user = await this.service.findById(req.params.id);
        res.status(200).send(sanitize(user));
    }

    @Post('/')
    async create(req: Request, res: Response) {
        const user = await this.service.create(req.body);
        res.status(200).send(sanitize(user));
    }

    @Patch('/:id')
    async edit(req: Request, res: Response) {
        const user = await this.service.edit(req.params.id, req.body);
        res.status(200).send(sanitize(user));
    }

    @Delete('/:id')
    async delete(req: Request, res: Response) {
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