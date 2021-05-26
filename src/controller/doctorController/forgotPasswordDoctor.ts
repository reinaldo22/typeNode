import { getCustomRepository } from "typeorm";
import DoctorRepository from "../../repositorie/doctorRepositorie";
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { hash } from 'bcryptjs';

class ForgotDoctorPassword {

    public async forgotDoctorPassword(req: Request, res: Response) {
        const doctorRepository = getCustomRepository(DoctorRepository);

        const { email } = req.body;


        try {

            const user = await doctorRepository.find({
                where: {
                    email
                }
            });
            var transport = nodemailer.createTransport({
                host: 'smtp.mailtrap.io',
                port: 2525,
                auth: {
                    user: "0be89881ec1c58",
                    pass: "f2fa7550b78068"
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
                            doctorRepository.update(user[0].id, {
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

export default new ForgotDoctorPassword();