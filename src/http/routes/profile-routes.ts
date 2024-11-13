import { Router } from "express";
import { makeProfileController } from "../factories/profile-controller-factory";

const profileController = makeProfileController();
const router = Router();

router.post("/profile", (req, res) => profileController.create(req, res));

export default router;
