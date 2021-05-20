import { Response} from 'express';

class AppError {

    public readonly message: string;
    public readonly statusCode: number;
    public readonly response:Response;

    constructor(res:Response) {
      this.response = res;
    }
    
  }
  
  export default AppError;