import { Router } from "express";
import PermissionController from "../controller/PermissionController";
import RoleController from "../controller/RoleController";
import UserController from "../controller/UserController";

const router = Router();

router.post("/cadastro", UserController.signUp);
router.post("/login", UserController.signIn);
router.post("/permissions", PermissionController.create);
router.post("/roles", RoleController.create);
router.post("/emailUpdate", UserController.forgotPassword);


export default router;