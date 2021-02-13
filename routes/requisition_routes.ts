import { Router } from "express";
import RequisitionController from "../controller/RequisitionController";
import { is } from "../middlewares/verifyToken";

const router = Router();
router.post("/requisitions", is(["ROLE_ADMIN"]), RequisitionController.create);
router.get("/requisitions", is(["ROLE_ADMIN"]), RequisitionController.index);
router.post("/requisitions/:id", RequisitionController.show);

export default router;