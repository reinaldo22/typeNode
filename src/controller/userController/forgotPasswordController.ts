import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../../repositorie/userRepositorie';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { hash } from 'bcryptjs';

class ForgotPassword {

    public async forgotPassword(req: Request, res: Response) {
        const userRepository = getCustomRepository(UserRepository);

        const { email } = req.body;


        try {

            const user = await userRepository.find({
                where: {
                    email
                }
            });
            var transport = nodemailer.createTransport({
                host: 'smtp.mailtrap.io',
                port: 2525,
                auth: {
                    user: "98b9ff94843710",
                    pass: "5bf821b88c9c02"
                }
            });
            const newPassword = crypto.randomBytes(4).toString('hex');
            transport.sendMail({
                from: 'Testando <b06b889ecb-0f0faf@inbox.mailtrap.io>',
                to: email,
                subject: 'Recuperacao de senha',
                text: `Olá sua senha é: ${newPassword}`
            }).then(
                () => {
                    hash(newPassword, 8).then(
                        password => {
                            userRepository.update(user[0].id, {
                                password
                            }).then(
                                () => {
                                    return res.status(200).json({ message: "email sended" })
                                }

                            ).catch(
                                () => {
                                    return res.status(404).json({ message: "user not found" })
                                }
                            )
                        }
                    )

                }
            ).catch(
                () => {
                    return res.status(404).json({ message: "fail to email" })
                }
            )
        } catch (error) {
            return res.status(404).json({ message: "erro" });
        }
    }
}

export default new ForgotPassword();