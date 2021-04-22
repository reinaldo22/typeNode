import { getCustomRepository } from "typeorm";
import DoctorRepository from "../../repositorie/doctorRepositorie";
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { hash } from 'bcryptjs';
import AppError from "../../shared/error/Error";

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
                            doctorRepository.update(user[0].id, {
                                password
                            }).then(
                                () => {
                                    throw new AppError('E-mail enviado com sucesso!',200);

                                }

                            ).catch(
                                () => {
                                    throw new AppError('Não existe', 404);
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