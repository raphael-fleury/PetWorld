import { userModel } from "../entities/models"
import { createToken } from "../services/token.service";
import { Router } from "express";
import bcrypt from "bcrypt";

const uri = '/';

function useRoutes(router: Router) {
    router.post('/login', async (req, res) => {
        let { email, password } = req.body;
    
        if (!email || !password) {
            return res.status(404).send("User not found.")
        }
    
        const user = await userModel.findOne({ email });
    
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(404).send("User not found.")
        }
    
        const token = createToken({ user: user._id });
        return res.status(200).send(token);
    })
}

export default { uri, useRoutes };