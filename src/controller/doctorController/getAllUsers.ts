import { getCustomRepository, getRepository } from 'typeorm';
import {  Request, Response } from 'express';
import Doctor from '../../models/Doctor';
import DoctorRepository from '../../repositorie/doctorRepositorie';
var axios = require('axios');


class AllUsers{


    public async getAll(req:Request, res:Response): Promise<Response>{
        
        const allDoctors = await getRepository(Doctor).find();
        
        return res.json(allDoctors);
    }
    
    public async getUser(req:Request, res:Response){
      
        const  {name, cpf, crm, email, password, phone} = req.body;
        const doctorRepository =  getCustomRepository(DoctorRepository);
        console.log(phone)
        const emailExists = await doctorRepository.findByEmail(email);
        if (emailExists) {
            return res.status(409).json({ message: "Email already registered in the system" });
        }
        const crmExists = await doctorRepository.findByCrm(crm);
        if (crmExists) {
            return res.status(409).json({ message: "CRM already registered in the system" });
        }
        const nameExists = await doctorRepository.findByName(name);
        if (nameExists) {
            return res.status(409).json({ message: "Name already registered in the system" });
        }
        const cpfExists = await doctorRepository.findByCpf(cpf);
        if (cpfExists) {
            return res.status(409).json({ message: "Cpf already registered in the system" });
        }
        const phoneExists = await doctorRepository.findByPhone(phone);
        if (phoneExists) {
            return res.status(409).json({ message: "Phone already registered in the system" });
        }
        try {
        const result = (await axios.get(`https://www.consultacrm.com.br/api/index.php?tipo=crm&uf=am&q=${crm}&chave=2798018964&destino=json`)).data;
        var text = JSON.stringify(result);
        var obj = JSON.parse(text)
        var medicos = [obj];
        let medico;
        let pessoa;
        
        for(medico of medicos){
            if(medico.total  === 0){
                return res.status(404).json({ message: "name not found" });
            }
            
            for(pessoa of medico.item){

               if(name !== pessoa['nome']){
                    return res.status(404).json({ message: "Doctor name not found 2" });
               }
               
               if(crm !== pessoa['numero']){
                return res.status(404).json({ message: "CRM not found or inactive, check the fields" });
               }
               if(pessoa['situacao'] !== 'Ativo'){
                return res.status(404).json({ message: "inactive CRM" });
               } 
            }   
        }
        var regexPhone =  new RegExp("^[(][1-9]{2}[)](?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$");
        var regexPassword = new RegExp("^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,13}$");
        var regexCpf = new RegExp("([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})")
        
        if(regexPhone.test(phone) ){
            
           return res.status(404).json({ message: "Invalid phone" }); 
        }
        if(!regexCpf.test(cpf)){
            return res.status(404).json({ message: "Invalid CPF" });   
        }
        if(!regexPassword.test(password)){
            res.status(404).json({ message: "Invalid Password" });
             
        }
        
        if(password.length < 6){
            return res.status(400).json({ message: "Minimum password of 6 characters" });
        }
        if(password.length > 13){
            return res.status(400).json({ message: "Maximum password of 13 characters" });
        }
        if(email === ''){
            return res.status(400).json({ message: "Email cannot be empty" });
        }
        
        
    return res.status(201).json({message:'ok'});
        } catch (error) {
            res.status(400).json(error)
        }
        
    }
}

export default new AllUsers();