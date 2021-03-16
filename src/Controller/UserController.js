import userService from '../Service/UserService';

class UserController {
    async createUser(req, res) {
        try {
            const { firstName, lastName, email, password } = req.body;
            const data = await userService.createUser(
                firstName,
                lastName,
                email,
                password
            );

            res.status(200).send(data);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async logIn(req, res) {
        try {
            const { email, password } = req.body;
            const data = await userService.logIn(email, password);
            
            if(data.isSuccessfully != false) {
               res.status(200).send(data);
            } else {
               res.status(401).send('Forbidden');
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async setUserPassword(req, res) {
        try {
            const { currentPassword, newPassword } = req.body;
            let userId = req.decoded.id;

            const data = await userService.setUserPassword(currentPassword, newPassword, userId);

            res.status(200).send(data);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

export default new UserController();
