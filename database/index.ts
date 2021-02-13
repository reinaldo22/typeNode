import { createConnection } from 'typeorm';

//busca as configurações no ormconfig.json, configurações do banco
createConnection().then(() => console.log('Conectado ao banco de dados'));