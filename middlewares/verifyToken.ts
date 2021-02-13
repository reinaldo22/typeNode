import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositorie/UserRepository";

export const cheJwt = async (req: Request) => {
  const userRepository = getCustomRepository(UserRepository);

  const token = <string>req.headers['auth'];


  const payLoad = jwt.decode(token);


  const user = await userRepository.findOne(payLoad?.sub, { relations: ["roles"] });



  return user;

}

function is(role: String[]) {
  const roleAuthorized = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = await cheJwt(req);

    const userRoles = user?.roles.map((role) => role.name);

    const existsRoles = userRoles?.some((r) => role.includes(r));

    if (existsRoles) {
      return next();
    }

    return res.status(401).json({ message: "Not authorized!" });
  };

  return roleAuthorized;
}

export { is };