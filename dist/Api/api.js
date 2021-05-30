"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require('axios');
class ApiCrm {
    static getName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield axios.get(`https://www.consultacrm.com.br/api/index.php?tipo=crm&uf=am&q=${name}&chave=2798018964&destino=json`)).data;
            var situacao;
            var text = JSON.stringify(result);
            var obj = JSON.parse(text, function (key, value) {
                if (key === 'situacao') {
                    situacao = value;
                }
            });
            return situacao;
        });
    }
}
exports.default = ApiCrm;
