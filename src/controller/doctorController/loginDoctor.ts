import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Doctor from '../../models/Doctor';


class LoginDoctorController {
    public async signInDoctor(req: Request, res: Response) {
        const repo = getRepository(Doctor);

        const { email, password } = req.body;

        const doctor = await repo.findOne({ email });
        console.log(doctor);
        if (!doctor) {
            return res.status(404).json({ message: "Email not registered in the system" });
        }
        if (!doctor.password) {
            return res.status(404).json({ message: "Inactive or invalid password" });
        }
        if (doctor.activate === 0) {
            return res.status(404).json({ message: "Inactive User or Invalid Password" });
        }
    
        const isValidatePassword = await bcrypt.compare(password, doctor.password as string);

        if (!isValidatePassword) {
            return res.status(401).json({ message: "Incorrect email or password"  });
        }
        
        const token = jwt.sign({ id: doctor.id }, 'secret', { expiresIn: '1d' });


        return res.json({
            doctor,
            message: "Ok",
            token
        });


    }
}
export default new LoginDoctorController();